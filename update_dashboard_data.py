import pandas as pd
import json
import matplotlib.pyplot as plt
import os

# 配置中文字体
plt.rcParams['font.family'] = ['PingFang HK', 'Arial Unicode MS', 'Heiti TC', 'sans-serif']
plt.rcParams['axes.unicode_minus'] = False 

def main():
    target_file = "/Users/jiaxingcai/Desktop/麻将店使用情况统计2.xlsx"
    workspace_dir = "/Users/jiaxingcai/Desktop/民宿管理大百科"
    
    print(f"读取新数据源: {target_file}")
    if not os.path.exists(target_file):
        print("错误: 新的 Excel 文件不存在")
        return
        
    df = pd.read_excel(target_file)
    
    # 查找表头
    header_row_idx = None
    for idx, row in df.iterrows():
        row_vals = [str(val).strip() for val in row.values]
        if '店名' in row_vals and '日期' in row_vals:
            header_row_idx = idx
            break
            
    if header_row_idx is not None:
        df = pd.read_excel(target_file, skiprows=header_row_idx + 1)
        df.columns = [str(c).strip() for c in df.columns]
    else:
        df.columns = [str(val).strip() for val in df.iloc[2].values]
        df = df.iloc[3:]
        
    df = df.dropna(subset=['日期', '店名'])
    
    # 清洗数据
    df['总间数'] = pd.to_numeric(df['总间数'], errors='coerce')
    df['今天使用间数'] = pd.to_numeric(df['今天使用间数'], errors='coerce')
    df['使用率'] = pd.to_numeric(df['使用率'], errors='coerce')
    
    # 格式化日期：有些可能是 datetime 对象，有些是字符串
    df['日期_dt'] = pd.to_datetime(df['日期'], errors='coerce')
    df = df.dropna(subset=['日期_dt'])
    df = df.sort_values(by='日期_dt')
    df['日期_str'] = df['日期_dt'].dt.strftime('%m-%d')
    
    # 1. 计算总排行 summaryData
    summary = df.groupby('店名').agg(
        平均使用率=('使用率', 'mean'),
        平均总间数=('总间数', 'mean')
    ).reset_index().sort_values(by='平均使用率', ascending=False)
    
    # 处理成网页所需的 summaryData 格式
    summary_list = []
    for _, row in summary.iterrows():
        summary_list.append({
            "name": row['店名'],
            "rate": round(float(row['平均使用率']), 3) if pd.notnull(row['平均使用率']) else 0.0,
            "rooms": int(round(row['平均总间数'])) if pd.notnull(row['平均总间数']) else 0
        })
        
    # 2. 计算每日走势 trendData
    # 获取所有不重复的有效日期并排序
    all_dates = sorted(df['日期_str'].unique())
    print(f"有效统计日期: {all_dates}")
    
    # 选择排名前6的店铺画折线图（或者与之前一致）
    top_shops = summary['店名'].head(6).tolist()
    trend_dict = {}
    
    for shop in top_shops:
        shop_df = df[df['店名'] == shop].set_index('日期_str').reindex(all_dates)
        rates = []
        for rate in shop_df['使用率']:
            if pd.isnull(rate):
                rates.append(None)
            else:
                rates.append(round(float(rate), 3))
        trend_dict[shop] = rates

    # 3. 重新绘制静态图表并保存
    # 图 1: 店铺平均使用率对比
    fig, ax = plt.subplots(figsize=(10, 6), dpi=300)
    colors = [
        '#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', 
        '#0D9488', '#14B8A6', '#F59E0B', '#F97316', 
        '#EF4444', '#DC2626', '#B91C1C', '#991B1B'
    ][:len(summary)]
    
    bars = ax.barh(summary['店名'], summary['平均使用率'], color=colors, edgecolor='none', height=0.6)
    ax.set_title('各麻将店平均使用率对比 (最新数据)', fontsize=14, fontweight='bold', pad=15)
    ax.set_xlabel('平均使用率', fontsize=11, labelpad=10)
    ax.set_xlim(0, 1.1)
    ax.invert_yaxis()
    
    for spine in ['top', 'right']:
        ax.spines[spine].set_visible(False)
    for spine in ['left', 'bottom']:
        ax.spines[spine].set_color('#CCCCCC')
    ax.grid(axis='x', linestyle='--', alpha=0.5)
    
    for bar in bars:
        width = bar.get_width()
        ax.text(width + 0.01, bar.get_y() + bar.get_height()/2, f'{width*100:.1f}%', 
                 va='center', ha='left', fontsize=10, fontweight='bold', color='#333333')
                 
    plt.tight_layout()
    chart1_path = os.path.join(workspace_dir, 'average_occupancy.png')
    plt.savefig(chart1_path, bbox_inches='tight')
    plt.close()
    print("图表 1 (average_occupancy.png) 已更新")
    
    # 图 2: 趋势折线图
    colors_dict = {
        top_shops[i]: ['#EF4444', '#3B82F6', '#F59E0B', '#10B981', '#8B5CF6', '#6B7280'][i % 6]
        for i in range(len(top_shops))
    }
    
    fig, ax = plt.subplots(figsize=(11, 6), dpi=300)
    for shop in top_shops:
        ax.plot(all_dates, [r if r is not None else float('nan') for r in trend_dict[shop]], 
                marker='o', color=colors_dict[shop], label=shop, linewidth=2.5, markersize=8)
                
    ax.set_title('代表性店铺日使用率走势对比 (最新数据)', fontsize=14, fontweight='bold', pad=15)
    ax.set_ylabel('使用率', fontsize=11, labelpad=10)
    ax.set_xlabel('日期', fontsize=11, labelpad=10)
    ax.set_ylim(-0.05, 1.05)
    
    for spine in ['top', 'right']:
        ax.spines[spine].set_visible(False)
    for spine in ['left', 'bottom']:
        ax.spines[spine].set_color('#CCCCCC')
    ax.grid(True, linestyle='--', alpha=0.5)
    ax.legend(title='店铺名称', bbox_to_anchor=(1.02, 1), loc='upper left', frameon=True, facecolor='#FFFFFF', edgecolor='#CCCCCC')
    
    plt.tight_layout()
    chart2_path = os.path.join(workspace_dir, 'daily_trend.png')
    plt.savefig(chart2_path, bbox_inches='tight')
    plt.close()
    print("图表 2 (daily_trend.png) 已更新")

    # 4. 读取旧的 dashboard.html，并在里面替换数据
    html_path = os.path.join(workspace_dir, 'dashboard.html')
    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
        
    # 我们需要替换 summaryData, dates, trendData
    # 替换 summaryData
    summary_json = json.dumps(summary_list, ensure_ascii=False, indent=12)
    # 匹配 const summaryData = [ ... ]; 并替换
    # 使用较强的正则或者简单查找替换
    start_tag = "const summaryData = ["
    end_tag = "];"
    start_idx = html_content.find(start_tag)
    if start_idx != -1:
        end_idx = html_content.find(end_tag, start_idx)
        old_block = html_content[start_idx:end_idx + len(end_tag)]
        new_block = f"const summaryData = {json.dumps(summary_list, ensure_ascii=False, indent=8)};"
        html_content = html_content.replace(old_block, new_block)
        
    # 替换 dates
    start_tag = "const dates = ["
    start_idx = html_content.find(start_tag)
    if start_idx != -1:
        end_idx = html_content.find(end_tag, start_idx)
        old_block = html_content[start_idx:end_idx + len(end_tag)]
        new_block = f"const dates = {json.dumps(all_dates, ensure_ascii=False)};"
        html_content = html_content.replace(old_block, new_block)

    # 替换 trendData
    start_tag = "const trendData = {"
    start_idx = html_content.find(start_tag)
    if start_idx != -1:
        end_idx = html_content.find("};", start_idx)
        old_block = html_content[start_idx:end_idx + 2]
        new_block = f"const trendData = {json.dumps(trend_dict, ensure_ascii=False, indent=8)};"
        html_content = html_content.replace(old_block, new_block)
        
    # 替换大屏里的大盘数据
    # 计算新大盘平均使用率
    overall_mean = df['使用率'].mean()
    overall_mean_str = f"{overall_mean * 100:.1f}%"
    print(f"大盘最新平均使用率: {overall_mean_str}")
    
    # 替换大盘使用率的 HTML
    # <div class="text-3xl font-bold text-blue-400 mt-2">52.1%</div>
    # 我们可以正则或者直接查找
    search_str = '大盘平均使用率</div>\n            <div class="text-3xl font-bold text-blue-400 mt-2">'
    start_idx = html_content.find(search_str)
    if start_idx != -1:
        val_start = start_idx + len(search_str)
        val_end = html_content.find("</div>", val_start)
        old_val = html_content[val_start:val_end]
        html_content = html_content[:val_start] + overall_mean_str + html_content[val_end:]
        
    # 替换领头羊店铺的 HTML
    # <div class="text-2xl font-bold text-emerald-400 mt-2 truncate">四个朋友麒麟店</div>
    # <div class="text-slate-500 text-xs mt-1">平均使用率高居 <span class="text-emerald-400 font-semibold">83.8%</span></div>
    top_shop_name = summary_list[0]['name']
    top_shop_rate = f"{summary_list[0]['rate'] * 100:.1f}%"
    
    search_str = '领头羊店铺</div>\n            <div class="text-2xl font-bold text-emerald-400 mt-2 truncate">'
    start_idx = html_content.find(search_str)
    if start_idx != -1:
        val_start = start_idx + len(search_str)
        val_end = html_content.find("</div>", val_start)
        html_content = html_content[:val_start] + top_shop_name + html_content[val_end:]
        
    search_str = '平均使用率高居 <span class="text-emerald-400 font-semibold">'
    start_idx = html_content.find(search_str)
    if start_idx != -1:
        val_start = start_idx + len(search_str)
        val_end = html_content.find("</span>", val_start)
        html_content = html_content[:val_start] + top_shop_rate + html_content[val_end:]

    # 写回文件
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print("dashboard.html 中的数据源已成功自动更新！")
    
    # 打印简短排行结果
    summary['平均总间数'] = summary['平均总间数'].round().astype(int)
    summary['平均使用间数'] = (summary['平均使用率'] * summary['平均总间数']).round().astype(int)
    print("\n=== 最新店铺经营排行 ===")
    print(summary.to_string(index=False))

if __name__ == "__main__":
    main()
