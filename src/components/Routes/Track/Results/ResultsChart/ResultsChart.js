import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const ResultsChart = (props) => {
  const { savedApplications } = props;

  const data = [];
  savedApplications.forEach((savedApplication) => {
    data.push(savedApplication.result);
  });

  const count = data.reduce((total, current) => {
    total[current] = (total[current] || 0) + 1;

    return total;
  }, {});

  return (
    <div style={{height: 400}}>
      <ResponsivePie
        data={[
          {
            "id": "Interview",
            "label": "Interview",
            "value": count['interview']
          },
          {
            "id": "Accepted Offer",
            "label": "Accepted Offer",
            "value": count['accepted-offer']
          },
          {
            "id": "Declined Offer",
            "label": "Declined Offer",
            "value": count['declined-offer']
          },
          {
            "id": "No Response",
            "label": "No Response",
            "value": count['no-response']
          },
          {
            "id": "No Offer",
            "label": "No Offer",
            "value": count['no-offer']
          },
          {
            "id": "Declined",
            "label": "Declined",
            "value": count['declined']
          },
          {
            "id": "Other",
            "label": "Other",
            "value": count['other']
          },
          {
            "id": "None",
            "label": "None",
            "value": count['']
          }
        ]}
        colors={['#F05540', '#4ABAA5', '#FFD15C', '#77B5F7']}
        margin={{ top: 10, right: 100, bottom: 30, left: 100 }}
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
        fill={[
          {
            match: {
                id: 'Interview'
            },
            id: 'lines'
          },
          {
            match: {
                id: 'Accepted Offer'
            },
            id: 'lines'
          },
          {
            match: {
                id: 'Declined Offer'
            },
            id: 'lines'
          },
          {
            match: {
                id: 'No Response'
            },
            id: 'lines'
          },
          {
            match: {
                id: 'No Offer'
            },
            id: 'lines'
          },
          {
            match: {
                id: 'Declined'
            },
            id: 'lines'
          },
          {
            match: {
                id: 'Other'
            },
            id: 'lines'
          },
          {
            match: {
                id: 'None'
            },
            id: 'lines'
          },
        ]}
      />
    </div>
  )
}

export default ResultsChart;
