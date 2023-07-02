import Image from 'next/image';
import styles from '@styles/components/tasks.module.scss';

const Tasks = () => {
  return (
    <div className={styles['tasks__container']}>
      <div className={styles['tasks__filter']}>
        <span>All Tasks</span>
        <span className={styles['filter--active']}>Pending</span>
        <span>Completed</span>
      </div>
      <div className={styles['divider']}></div>
      <div className={styles['tasks__task-list']}>
        <ul role="list">
          <li>
            <div className={styles['task-list__task-header']}>
              <span className="text-truncate">Complete pomodoro Project</span>
              <div className={styles['task-header__control-icons']}>
                <span>3/4</span>
                <span><Image src="/assets/icons/edit.svg" alt="edit icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/delete.svg" alt="delete icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/description.svg" alt="description icon" height={20} width={20} /></span>
              </div>
            </div>
            <div className={styles['task-list__task-body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestiae dolorem nesciunt tempora consequatur similique aspernatur nostrum officiis consectetur sunt ullam assumenda, iste laudantium aut aperiam omnis cupiditate earum odit ex molestias facere nam? Recusandae nostrum, cumque vero excepturi.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quas voluptatem ullam consequatur atque sit debitis, quia nihil eveniet sint, eius quis iste neque error, esse reiciendis animi expedita ipsam.
            <span>Read More</span></div>
          </li>
          <li>
            <div className={styles['task-list__task-header']}>
              <span className="text-truncate">Complete pomodoro Project</span>
              <div className={styles['task-header__control-icons']}>
                <span>3/4</span>
                <span><Image src="/assets/icons/edit.svg" alt="edit icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/delete.svg" alt="delete icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/description.svg" alt="description icon" height={20} width={20} /></span>
              </div>
            </div>
            {/* <div className={styles['task-list__task-body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestiae dolorem nesciunt tempora consequatur similique aspernatur nostrum officiis consectetur sunt ullam assumenda, iste laudantium aut aperiam omnis cupiditate earum odit ex molestias facere nam? Recusandae nostrum, cumque vero excepturi.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quas voluptatem ullam consequatur atque sit debitis, quia nihil eveniet sint, eius quis iste neque error, esse reiciendis animi expedita ipsam.
            <span>Read More</span></div> */}
          </li>
          <li>
            <div className={styles['task-list__task-header']}>
              <span className="text-truncate">Complete pomodoro Project</span>
              <div className={styles['task-header__control-icons']}>
                <span>3/4</span>
                <span><Image src="/assets/icons/edit.svg" alt="edit icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/delete.svg" alt="delete icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/description.svg" alt="description icon" height={20} width={20} /></span>
              </div>
            </div>
            {/* <div className={styles['task-list__task-body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestiae dolorem nesciunt tempora consequatur similique aspernatur nostrum officiis consectetur sunt ullam assumenda, iste laudantium aut aperiam omnis cupiditate earum odit ex molestias facere nam? Recusandae nostrum, cumque vero excepturi.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quas voluptatem ullam consequatur atque sit debitis, quia nihil eveniet sint, eius quis iste neque error, esse reiciendis animi expedita ipsam.
            <span>Read More</span></div> */}
          </li>
          <li>
            <div className={styles['task-list__task-header']}>
              <span className="text-truncate">Complete pomodoro Project</span>
              <div className={styles['task-header__control-icons']}>
                <span>3/4</span>
                <span><Image src="/assets/icons/edit.svg" alt="edit icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/delete.svg" alt="delete icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/description.svg" alt="description icon" height={20} width={20} /></span>
              </div>
            </div>
            {/* <div className={styles['task-list__task-body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestiae dolorem nesciunt tempora consequatur similique aspernatur nostrum officiis consectetur sunt ullam assumenda, iste laudantium aut aperiam omnis cupiditate earum odit ex molestias facere nam? Recusandae nostrum, cumque vero excepturi.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quas voluptatem ullam consequatur atque sit debitis, quia nihil eveniet sint, eius quis iste neque error, esse reiciendis animi expedita ipsam.
            <span>Read More</span></div> */}
          </li>
        </ul>
        <div className={styles['tasks__show-more']}>
          Show More...
        </div>
      </div>
    </div>
  );
}

export default Tasks;
