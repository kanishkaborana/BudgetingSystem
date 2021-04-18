import React, { useState, ComponentProps } from 'react';
import { PieChart} from 'react-minimal-pie-chart'


function FullOption(props) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }
    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        color: 'black',
        fontFamily:
          '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
        fontSize: '1px'
      }}
      data={data}
      radius={8}
      center={[25,10]}
      viewBoxSize={[50,20]}
      lineWidth={60}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={(index) => (index === selected ? 2 : 0)}
      animate
      label={({ dataEntry }) => dataEntry.title + ' ' + Math.round(dataEntry.percentage) + '%'}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        color: 'black',
        fill: '#fff',
        opacity: 0.75,
        pointerEvents: 'none',
      }}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default FullOption;