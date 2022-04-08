export class Weather {
  constructor(
    public city: string,
    public country: string,
    public shortDesc: string,
    public longDesc: string,
    public temp: number,
    public minTemp: number,
    public maxTemp: number,
    public sunRise: Date,
    public sunSet: Date,
    public humidity: number,
    public pressure: number,
    public windDeg: number,
    public windSpeed: number,
    public seaLevel: number
  ) {}
}
