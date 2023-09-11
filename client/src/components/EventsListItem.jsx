import EventDetailsModal from './EventDetailsModal';
import { decodeCat } from '../utilities/category';

export default function EventsListItem({ event, setPannedEvent }) {
  const handleClick = (e) => {
    setTimeout(() => {
      const lat = event.coordinates.latitude;
      const lng = event.coordinates.longitude;
      setPannedEvent([[lat, lng], 14]);
    }, 100);

    return null;
  };

  const dateSplit = new Date(event.date).toLocaleString().split(',');

  return (
    <div
      className='card card-side bg-base-100 min-h-48 m-2 shadow flex flex-row'
      onClick={handleClick}
    >
      <figure className='w-1/3 relative'>
        <img
          className='h-full absolute hover:transform hover:scale-105 transition ease-linear'
          src={event.image}
          alt={event.name}
        />
      </figure>
      <div className='w-2/3 h-full card-body flex flex-col justify-center align-middle items-start'>
        <div>
          <h2 className='card-title text-2xl'>{event.name}</h2>
          <span className=''>
            Starting at
            <span className='text-primary font-semibold'>{dateSplit[1]} </span>
            on
            <span className='text-primary font-semibold'> {dateSplit[0]}</span>
          </span>
          <div>{decodeCat(event.category)}</div>
        </div>
        <EventDetailsModal modalId={event._id + '1'} eventId={event._id} />
      </div>
    </div>
  );
}
