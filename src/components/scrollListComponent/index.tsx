import useStore from "@/store";
import UUID from 'uuidjs'
import styles from './index.less'
import {IJobs} from "@/types";
import InfiniteScroll from 'react-infinite-scroll-component';

const ScrollListComponent = () => {
    const reduxJobs: IJobs[] = useStore((state) => state.jobs)

    return <div className={styles.jobsContainer}>
        <div className={styles.title}>最新职位</div>
        <div className={styles.scrollContainer}>
            {reduxJobs.map(item => {
                return <div key={UUID.generate()} className={styles.listItemContainer}>
                    <span>{item.job}</span>
                    <span>{item.location}</span>
                    <span>{item.timestamp}</span>
                </div>
            })}
        </div>
    </div>
}

export default ScrollListComponent