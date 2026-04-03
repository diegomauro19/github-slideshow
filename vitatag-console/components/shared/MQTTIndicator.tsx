export default function MQTTIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="mqtt-pulse absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
      </span>
      <span className="text-xs font-medium text-gray-600">MQTT Conectado</span>
    </div>
  );
}
