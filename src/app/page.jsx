import Timer from '@components/Timer';
import AddTask from '@components/AddTask';

const Page = () => {
  return (
    <main className="min-w-[375px] flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center items-center">
        <Timer />
      </section>
      <section>
        <AddTask />
      </section>
    </main>
  );
}

export default Page;
