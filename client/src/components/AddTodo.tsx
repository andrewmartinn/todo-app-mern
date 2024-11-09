const AddTodo: React.FC = () => {
  return (
    <section className="my-8">
      <h3 className="text-sm font-bold uppercase text-slate-500">
        Create a Task
      </h3>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="text"
            className="mt-2 text-sm font-bold text-slate-400"
          >
            What's on your todo list?
          </label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="e.g. workout"
            className="appearance-none rounded-[0.5rem] border-none bg-white bg-none px-4 py-2 shadow-sm outline-none"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="mt-2 text-sm font-bold text-slate-400">
            Pick a category
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <label
              htmlFor="category1"
              className="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg bg-white p-4 shadow-sm"
            >
              <input type="radio" name="category" id="category1" value="Work" />
              <span className="custom-bubble work"></span>
              <div className="text-sm text-slate-400">Work</div>
            </label>
            <label
              htmlFor="category2"
              className="flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg bg-white p-4 shadow-sm"
            >
              <input
                type="radio"
                name="category"
                id="category2"
                value="Personal"
              />
              <span className="custom-bubble personal"></span>
              <div className="text-sm text-slate-400">Personal</div>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary-100 rounded-lg px-4 py-2 text-white transition-opacity duration-[200ms] ease-in-out hover:opacity-75"
        >
          Add Todo
        </button>
      </form>
    </section>
  );
};

export default AddTodo;
