import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { turnDashesIntoSpacesAndCapitalize } from '../../../../../shared/utilities';

const ResultsChart = (props) => {
  const { savedApplications } = props;

  const values = savedApplications.reduce((total, current) => {
    total[current.result] = (total[current.result] || 0) + 1;

    return total;
  }, {});

  const data = [];
  for(let value in values) {
    const name = value === '' ? 'None' : turnDashesIntoSpacesAndCapitalize(value);

    data.push({
      id: name,
      label: name,
      value: values[value]
    });
  }

  const rawData = [];
  savedApplications.forEach((savedApplication) => {
    rawData.push(savedApplication.result);
  });

  const fill = [];
  for(let data in rawData) {
    fill.push({
      match: {
        id: rawData[data] === '' ? 'None' : turnDashesIntoSpacesAndCapitalize(rawData[data])
      },
      id: 'lines'
    });
  }

  return (
    <div style={{height: 400}}>
      <ResponsivePie
        data={data}
        colors={['#F05540', '#4ABAA5', '#FFD15C', '#77B5F7']}
        margin={{ top: 10, right: 100, bottom: 20, left: 100 }}
        innerRadius={0.5}
        padAngle={2.5}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#344A5E"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#FFFFFF"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.1)',
            rotation: -45,
            lineWidth: 5,
            spacing: 10
          }
        ]}
        fill={fill}
      />
    </div>
  )
}

export default ResultsChart;
