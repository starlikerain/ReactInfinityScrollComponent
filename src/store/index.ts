import create from 'zustand'
import {persist} from 'zustand/middleware'
import {IZustandProps} from '@/types'

const useStore = create<IZustandProps>(
    (set) => ({
        jobs: [
            {
                job: '一号',
                location: '杭州',
                timestamp: '1671356041724',
            },
            {
                job: '二号',
                location: '四川',
                timestamp: '1671356041724',
            },
            {
                job: '三号',
                location: '重庆',
                timestamp: '1671356041724',
            },
            {
                job: '四号',
                location: '芜湖',
                timestamp: '1671356041724',
            },
            {
                job: '五号',
                location: '葛洲坝',
                timestamp: '1671356041724',
            },
            {
                job: '六号',
                location: '临平',
                timestamp: '1671356041724',
            },
            {
                job: '七号',
                location: '起飞',
                timestamp: '1671356041724',
            },
            {
                job: '八号',
                location: '火星',
                timestamp: '1671356041724',
            },
        ],
        // increasePopulation: () => set((state) => ({bears: state.bears + 1})),
        // removeAllBears: () => set({bears: 0}),
    })
)

export default useStore