import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

interface ChartGeneratorProps {
  text: string;
}

const ChartGenerator: React.FC<ChartGeneratorProps> = ({ text }) => {
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    if (!text) return;

    // 分析文本中的数字数据
    const numbers = text.match(/\d+(\.\d+)?/g)?.map(Number) || [];
    const words = text.split(/\s+/).filter(word => word.length > 0);

    // 生成图表配置
    const options = {
      title: {
        text: '文章数据分析',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['字数', '段落数', '数字数量', '平均段落长度']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '数据统计',
          type: 'bar',
          data: [
            words.length,
            text.split('\n\n').length,
            numbers.length,
            Math.round(words.length / text.split('\n\n').length)
          ],
          itemStyle: {
            color: '#07c160'
          }
        }
      ]
    };

    setChartOptions(options);
  }, [text]);

  if (!chartOptions) return null;

  return (
    <div className="chart-container" style={{ margin: '20px 0', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 16px #eee' }}>
      <ReactECharts option={chartOptions} style={{ height: '400px' }} />
    </div>
  );
};

export default ChartGenerator; 