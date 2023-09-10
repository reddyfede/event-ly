import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../components/App';
import { getAllEvents } from '../utilities/events-service';
import { useParams } from "react-router-dom";
import { showUser } from '../utilities/users-service';
import { useAuth0 } from "@auth0/auth0-react"
import UserPanelAttendingItem from '../components/UserPanelAttendingItem';
import UserPanelCreatedItem from '../components/UserPanelCreatedItem';

export default function UserPanel() {
  const { isLoading } = useAuth0()
  const currUser = useContext(UserContext)
  const routeId = useParams().id
  const [routeUser, setRouteUser] = useState(null)
  const [createdEvents, setCreatedEvents] = useState(null)
  const [attendingEvents, setAttendingEvents] = useState(null)
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [loadingUser, setLoadingUser] = useState(true)
  const [activeTab, setActiveTab] = useState(1)

  async function retrieveUser() {
    try {
      setLoadingEvents(true)
      setLoadingUser(true)
      setAttendingEvents(null)
      setCreatedEvents(null)
      if (currUser) {
        if (currUser.ID === routeId) {
          setRouteUser({
            name: currUser.NAME,
            picture: currUser.PIC,
            _id: currUser.ID
          })
          setLoadingUser(false)
        } else {
          const res = await showUser(routeId)
          if (res._id) {
            setRouteUser(res)
            setLoadingUser(false)
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function retrieveEvents() {
    try {
      if (currUser && routeUser) {
        const allEvents = await getAllEvents({ userId: routeId, filterBy: "user" })
        if (allEvents.length >= 0) {
          const created = []
          const attending = []
          allEvents.map((event) => (
            event.createdBy === routeId ? created.push(event) : attending.push(event)
          ))
          setCreatedEvents(created)
          setAttendingEvents(attending)
          setLoadingEvents(false)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    retrieveUser()
  }, [currUser, routeId])

  useEffect(() => {
    retrieveEvents()
  }, [routeUser])

  function handleClick(e) {
    e.preventDefault()
    console.log(e.target.id, e.target.className)
    setActiveTab(e.target.id)
  }

  const active = "tab tab-lifted tab-active"
  const inactive = "tab tab-lifted"

  return (
    <div className="flex flex-col justify-center align-middle items-center w-full">
      <h1>USER PANEL</h1>
      {!isLoading ? (<>
        {currUser ? (
          <>
            {loadingUser ? (
              <div>Loading User Info...</div>
            ) : (
              <div>
                <img src={routeUser.picture} alt={routeUser.name} className='w-30 rounded-xl' />
                <div>{routeUser.name}</div>
              </div>
            )}

            <br />

            <div className="tabs">
              <a id={1} className={activeTab == 1 ? active : inactive} onClick={handleClick} >
                CREATED EVENTS
              </a>
              <a id={2} className={activeTab == 2 ? active : inactive} onClick={handleClick} >
                ATTENDING EVENTS
              </a>
            </div>

            <br/>

            {loadingEvents ? (
              <div>Loading Events...</div>
            ) : (
              <div>

                <section hidden={activeTab == 2}>
                  {createdEvents.length ? (
                    <>
                      {createdEvents.map((event) => (
                        <UserPanelCreatedItem key={event._id} event={event} currUser={currUser} routeId={routeId}
                          createdEvents={createdEvents} setCreatedEvents={setCreatedEvents}
                          retrieveEvents={retrieveEvents}
                        />
                      ))}
                    </>
                  ) : (
                    <div>Not hosting any event yet.</div>
                  )}
                </section>

                <section hidden={activeTab == 1}>
                  {attendingEvents.length ? (
                    <>
                      {attendingEvents.map((event) => (
                        <UserPanelAttendingItem key={event._id} event={event} currUser={currUser} routeId={routeId}
                          attendingEvents={attendingEvents} setAttendingEvents={setAttendingEvents}
                          retrieveEvents={retrieveEvents}
                        />
                      ))}
                    </>
                  ) : (
                    <div>Not attending any event yet.</div>
                  )}
                </section>

              </div>
            )}
          </>
        ) : (
          <div>Log in to see info</div>
        )}
      </>
      ) :
        <>Loading Content...</>
      }
    </div>
  );
};


