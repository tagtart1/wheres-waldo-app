import CSS from "csstype";

interface LabelProps {
  clickCoords: {
    x: number;
    y: number;
  };
}

const Label = ({ clickCoords }: LabelProps) => {
  const styleLabel: CSS.Properties = {
    left: clickCoords.x.toString(),
    top: clickCoords.y.toString(),
    position: "absolute",
  };

  return <div style={styleLabel}>Hi</div>;
};

export default Label;
