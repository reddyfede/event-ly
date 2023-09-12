import { showEvent } from '../utilities/events-service';
import { useState, useContext } from 'react';
import EventDetailsComments from './EventDetailsComments';
import EventDetailsGuests from './EventDetailsGuests';
import LoginButton from './LoginButton';
import { UserContext } from './App';
import { decodeCat } from '../utilities/category';
import { FaStar } from 'react-icons/fa';
import { FaRegClock, FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function EventDetailsModal({ modalId, eventId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingShow, setLoadingShow] = useState(true);
  const [event, setEvent] = useState(null);
  const currUser = useContext(UserContext);

  async function handleClick() {
    document.getElementById(modalId).showModal();
    setIsModalOpen(true);
    retrieveData();
  }

  function handleCancel() {
    document.getElementById(modalId).close();
    setIsModalOpen(false);
  }

  async function retrieveData() {
    try {
      const showResponse = await showEvent(eventId);
      if (showResponse?._id) {
        setEvent(showResponse);
        setLoadingShow(false);
      } else {
        console.log(showResponse);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button
        onClick={() => handleClick()}
        className='btn btn-active btn-primary'
      >
        Event Details
      </button>

      <dialog id={modalId} className='modal w-screen'>
        <div className='modal-box flex  no-scrollbar'>
          {isModalOpen ? (
            <>
              {loadingShow ? (
                <div>Loading Events Details</div>
              ) : (
                <div className='flex-col justify-center items-center'>
                  <div className='card'>
                    <figure>
                      <img src={event.image} alt={event.name} />
                    </figure>
                    <h1 className='text-3xl text-center my-2'>{event.name}</h1>
                    <div className='card-body'>
                      <h2 className='card-title'>
                        <span>
                          <FaRegClock />
                        </span>
                        {new Date(event.date).toLocaleString()}
                      </h2>
                      <h2 className='card-title'>
                        <span>
                          <FaLocationDot />
                        </span>
                        {event.address}
                      </h2>
                    </div>
                  </div>
                  <div className='card flex flex-col'>
                    <div className='card-body text-lg'>
                      <h2 className='card-title'>Details</h2>
                      <div className='mx-3'>
                        <span>
                          Location: <span>{event.location}</span>
                        </span>
                        <span>{event.description}</span>
                      </div>
                    </div>
                  </div>
                  <div className='card flex flex-col'>
                    <div className='card'>
                      <div className='card-body'>
                        <div className='card-title'>Host</div>
                        <div className='flex justify-between'>
                          <figure className='flex flex-col justify-start'>
                            <img
                              src={event.createdBy.picture}
                              alt={event.createdBy.name}
                              className='rounded-xl'
                            />
                            <h2 className='text-lg'>{event.createdBy.name}</h2>
                          </figure>
                          <div className='flex justify-center items-center'>
                            <div className='card-actions'>
                              <Link
                                to={`/user/${event.createdBy._id}`}
                                className='btn btn-primary'
                              >
                                <span className='text-white'>Profile</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card flex flex-col'>
                    <div className='card-body'>
                      <div className='card-title'>Guests</div>
                      <EventDetailsGuests event={event} setEvent={setEvent} />
                    </div>
                  </div>

                  <div className='card flex flex-col '>
                    <div className='card-body'>
                      <h2 className='card-title'>Comments</h2>
                      <EventDetailsComments event={event} setEvent={setEvent} />
                      {!currUser ? <LoginButton /> : null}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}

          <form method='dialog'>
            <button
              className='btn btn-sm btn-circle btn-ghost fixed right-2 top-2'
              onClick={handleCancel}
            >
              ✕
            </button>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button onClick={handleCancel}>close</button>
        </form>
      </dialog>
    </div>
  );
}
