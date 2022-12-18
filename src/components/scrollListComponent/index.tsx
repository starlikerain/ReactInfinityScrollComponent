import React, {useEffect, useState} from 'react';
import {Avatar, List, message} from 'antd';
import VirtualList from 'rc-virtual-list';
import {inspect} from "util";
import styles from './index.less'
import $ from "jquery";

interface UserItem {
    email: string;
    gender: string;
    name: {
        first: string;
        last: string;
        title: string;
    };
    nat: string;
    location: {
        city: string
    }
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}

const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,location,nat,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

let CUR_OFFSET = 0
let TIMER: NodeJS.Timeout

const ScrollListComponent: React.FC = () => {
    const [data, setData] = useState<UserItem[]>([]);

    const appendData = () => {
        return new Promise((resolve) => {
            try {
                fetch(fakeDataUrl)
                    .then((res) => res.json())
                    .then((body) => {
                        setData(data.concat(body.results));
                        resolve(true)

                    });
            } catch (e) {
                resolve(false)
            }
        })
    };

    useEffect(() => {
        appendData().then((res) => {
            if (res && !TIMER) {
                execTimer()
            }
        });
    }, []);

    const execTimer = () => {
        TIMER = setInterval(() => {
            (function ($) {
                try {
                    // @ts-ignore
                    $('.rc-virtual-list-holder').scrollTop = ++CUR_OFFSET;
                } catch (e) {
                    console.error('没有元素 .rc-virtual-list-holder')
                }
            })(document.querySelector.bind(document));
        }, 20)
    }

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };

    const handleMouseEnter = () => {
        clearInterval(TIMER)
    }

    const handleMouseLeave = () => {
        CUR_OFFSET = $(".rc-virtual-list-holder").scrollTop()

        execTimer()
    }

    return (
        <div className={styles.jobsContainer}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            <div className={styles.title}>最新职位</div>
            <List>
                <VirtualList
                    data={data}
                    height={ContainerHeight}
                    itemHeight={47}
                    itemKey="email"
                    onScroll={onScroll}
                >
                    {(item: UserItem) => (
                        <List.Item key={item.email}>
                            <div>同城零售-ToB产品运营（猫超卡）{item && item.nat}</div>
                            <div>{item && item.location && item.location.city}</div>
                            <div>19分钟前</div>
                        </List.Item>
                    )}
                </VirtualList>
            </List>
        </div>

    );
};

export default ScrollListComponent;

// import useStore from "@/store";
// import {useState, useEffect} from 'react'
// import UUID from 'uuidjs'
// import {Divider, List, Avatar, Skeleton} from 'antd'
// import styles from './index.less'
// import {IJobs} from "@/types";
// import InfiniteScroll from 'react-infinite-scroll-component';
//
// interface DataType {
//     gender: string;
//     name: {
//         title: string;
//         first: string;
//         last: string;
//     };
//     email: string;
//     picture: {
//         large: string;
//         medium: string;
//         thumbnail: string;
//     };
//     nat: string;
// }
//
// const ScrollListComponent = () => {
//     const reduxJobs: IJobs[] = useStore((state) => state.jobs)
//
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState<DataType[]>([]);
//
//     const loadMoreData = () => {
//         if (loading) {
//             return;
//         }
//         setLoading(true);
//         fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
//             .then((res) => res.json())
//             .then((body) => {
//                 setData([...data, ...body.results]);
//                 setLoading(false);
//             })
//             .catch(() => {
//                 setLoading(false);
//             });
//     };
//
//     useEffect(() => {
//         loadMoreData();
//     }, []);
//
//     return <>
//         {/*<div className={styles.title}>最新职位</div>*/}
//         {/*<div className={styles.scrollContainer}>*/}
//         {/*{reduxJobs.map(item => {*/}
//         {/*    return <div key={UUID.generate()} className={styles.listItemContainer}>*/}
//         {/*        <span>{item.job}</span>*/}
//         {/*        <span>{item.location}</span>*/}
//         {/*        <span>{item.timestamp}</span>*/}
//         {/*    </div>*/}
//         {/*})}*/}
//
//         {/*</div>*/}
//         <InfiniteScroll
//             dataLength={data.length}
//             next={loadMoreData}
//             hasMore={data.length < 50}
//             loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
//             endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
//             scrollableTarget="scrollableDiv"
//         >
//             <List
//                 dataSource={data}
//                 renderItem={(item) => (
//                     <List.Item key={item.email}>
//                         <List.Item.Meta
//                             avatar={<Avatar src={item.picture.large}/>}
//                             title={<a href="https://ant.design">{item.name.last}</a>}
//                             description={item.email}
//                         />
//                         <div>Content</div>
//                     </List.Item>
//                 )}
//             />
//         </InfiniteScroll>
//     </>
// }
//
// export default ScrollListComponent