interface MapProps {
  height?: string;
  className?: string;
}

const Map = ({ height = "300px", className = "" }: MapProps) => {
  return (
    <div 
      className={`bg-muted rounded-lg border border-border flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <div className="text-center text-muted-foreground">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="text-sm font-medium">Interactive Map</p>
        <p className="text-xs">Map integration will be implemented here</p>
        <p className="text-xs mt-2">Click to select location for issue reporting</p>
      </div>
    </div>
  );
};

export default Map;