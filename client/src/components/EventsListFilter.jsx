import { Categories, initFilter } from '../utilities/category';

export default function EventsListFilter({ eventFilter, setEventFilter }) {
  function handleChange(e) {
    const updatedData = { ...eventFilter };
    if (e.target.type === 'date') {
      updatedData[e.target.name] = e.target.value;
    } else {
      updatedData[e.target.name] = e.target.checked;
    }
    setEventFilter(updatedData);
  }

  function handleClear(e) {
    e.preventDefault();
    const init = initFilter();
    const old = { ...eventFilter };
    let data = {};
    if (e.target.id === 'clearAll') {
      data = { ...init };
    }
    if (e.target.id === 'clearCat') {
      data = { ...init, minDate: old.minDate, maxDate: old.maxDate };
    }
    if (e.target.id === 'clearDate') {
      data = { ...old, minDate: init.minDate, maxDate: init.maxDate };
    }
    setEventFilter(data);
  }

  const filterCats = () => {
    const filterOpts = [];
    Categories.forEach((c, idx) => {
      filterOpts.push(
        <label
          key={idx}
          htmlFor={c}
          className={`h-auto btn btn-square ${
            eventFilter[c] === true ? 'btn-primary text-white' : ''
          }`}
        >
          <p className='text-xs'>{c}</p>
          <div className='h-5 w-20 overflow-hidden'>
            <img
              src={`/assets/${idx + 1}.svg`}
              className='relative object-fill'
            />
          </div>
          <input
            type='checkbox'
            value={idx + 1}
            onChange={handleChange}
            name={c}
            id={c}
            className={`hidden`}
          />
        </label>
      );
    });
    return filterOpts;
  };

  return (
    <div className='flex flex-col m-2'>
      <form>
        {/* <div className='flex justify-evenly items-center my-10'>
          
        </div> */}
        <h2 className='my-2 text-lg'>Filter by category:</h2>

        <div className='flex flex-wrap gap-2 justify-center items-center  w-5/6'>
          {filterCats(eventFilter)}
        </div>
      </form>

      <form>
        <h2 className='mt-5 text-lg'>Filter by date:</h2>

        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='date'>
            <span className='label-text'>From:</span>
          </label>
          <input
            className='primary label-text input input-bordered w-full max-w-xs input-primary'
            type='date'
            value={eventFilter.minDate}
            onChange={handleChange}
            id='date'
            required
            name='minDate'
            min={new Date().toISOString().slice(0, -14)}
            max={eventFilter.maxDate}
          />
        </div>

        <div className='form-control w-full max-w-xs'>
          <label className='label' htmlFor='date'>
            <span className='label-text'>To:</span>
          </label>
          <input
            className='primary label-text input input-bordered w-full max-w-xs input-primary'
            type='date'
            value={eventFilter.maxDate}
            onChange={handleChange}
            id='date'
            required
            name='maxDate'
            min={eventFilter.minDate}
          />
        </div>
      </form>

      <div className='flex flex-wrap gap-2 my-5'>
        <button
          id='clearCat'
          onClick={handleClear}
          className='btn btn-error btn-outline btn-sm'
        >
          clear categories
        </button>
        <button
          id='clearDate'
          onClick={handleClear}
          className='btn btn-error btn-outline btn-sm'
        >
          clear dates
        </button>
        <button
          id='clearAll'
          onClick={handleClear}
          className='btn btn-error btn-outline btn-sm'
        >
          clear all
        </button>
      </div>
    </div>
  );
}
