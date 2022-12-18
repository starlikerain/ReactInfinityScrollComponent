export interface IJobs {
    job: string
    location: string
    timestamp: string
}
export interface IZustandProps {
    jobs: IJobs[]
    // increasePopulation: () => void
    // removeAllBears: () => void
}