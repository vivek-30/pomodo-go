import Image from 'next/image';
import styles from '@styles/tasks.module.css';

const Tasks = () => {
  return (
    <div className={styles['tasks-container']}>
      <div className={styles['tasks-filter-container']}>
        <span>All Tasks</span>
        <span className={styles.active}>Pending</span>
        <span>Completed</span>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.tasks}>
        <ul role="list">
          <li>
            <div className={styles['task-header']}>
              <span className="text-truncate">Complete pomodoro Project</span>
              <div className={styles['task-control-icons']}>
                <span className={styles.rounds}>3/4</span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
              </div>
            </div>
            <div className={styles['task-body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestiae dolorem nesciunt tempora consequatur similique aspernatur nostrum officiis consectetur sunt ullam assumenda, iste laudantium aut aperiam omnis cupiditate earum odit ex molestias facere nam? Recusandae nostrum, cumque vero excepturi.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quas voluptatem ullam consequatur atque sit debitis, quia nihil eveniet sint, eius quis iste neque error, esse reiciendis animi expedita ipsam.
            <span>Read More</span></div>
          </li>
          <li>
            <div className={styles['task-header']}>
              <span className="text-truncate">Do workout yoo!!!</span>
              <div className={styles['task-control-icons']}>
                <span className={styles.rounds}>3/4</span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
              </div>
            </div>
            {/* <div className={styles['task-body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestiae dolorem nesciunt tempora consequatur similique aspernatur nostrum officiis consectetur sunt ullam assumenda, iste laudantium aut aperiam omnis cupiditate earum odit ex molestias facere nam? Recusandae nostrum, cumque vero excepturi praesentium minima voluptatibus dolores tempore voluptatum suscipit dolorum tenetur dicta quo <span>Read More</span></div> */}
          </li>
          <li>
            <div className={styles['task-header']}>
              <span className="text-truncate">Do college assignment</span>
              <div className={styles['task-control-icons']}>
                <span className={styles.rounds}>3/4</span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
              </div>
            </div>
            {/* <div className={styles['task-body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestiae dolorem nesciunt tempora consequatur similique aspernatur nostrum officiis consectetur sunt ullam assumenda, iste laudantium aut aperiam omnis cupiditate earum odit ex molestias facere nam? Recusandae nostrum, cumque vero excepturi praesentium minima voluptatibus dolores tempore voluptatum suscipit dolorum tenetur dicta quo <span>Read More</span></div> */}
          </li>
          <li>
            <div className={styles['task-header']}>
              <span className="text-truncate">Play PUBG</span>
              <div className={styles['task-control-icons']}>
                <span className={styles.rounds}>3/4</span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
                <span><Image src="/assets/icons/forward.svg" alt="foward-button icon" height={20} width={20} /></span>
              </div>
            </div>
            {/* <div className={styles['task-body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat molestiae dolorem nesciunt tempora consequatur similique aspernatur nostrum officiis consectetur sunt ullam assumenda, iste laudantium aut aperiam omnis cupiditate earum odit ex molestias facere nam? Recusandae nostrum, cumque vero excepturi praesentium minima voluptatibus dolores tempore voluptatum suscipit dolorum tenetur dicta quo <span>Read More</span></div> */}
          </li>          
        </ul>
        <div className={styles['show-more']}>
          Show More...
        </div>
      </div>
    </div>
  );
}

export default Tasks;
