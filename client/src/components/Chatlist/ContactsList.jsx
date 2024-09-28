import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/StateContext';
import { GET_ALL_CONTACTS } from '@/utils/ApiRoutes';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { BiArrowBack, BiSearchAlt2 } from 'react-icons/bi';
import ChatListItem from './ChatListItem';

const ContactsList = () => {
  const [allContacts, setAllContacts] = useState({});
  const [{}, dispatch] = useStateProvider();
  //when component is added get all contacts from Api with useEffect
  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await axios.get(GET_ALL_CONTACTS);
        console.log('data', data);
        if (data && data.usersGroupedByInitialLetter) {
          setAllContacts(data.usersGroupedByInitialLetter);
        } else {
          console.log('Unexpected data structure', data);
          setAllContacts({});
        }
      } catch (error) {
        console.log('Failed to get contacts', error.message);
        setAllContacts({});
      }
    };
    getContacts();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() =>
              dispatch({
                type: reducerCases.SET_ALL_CONTACTS_PAGE,
              })
            }
          />
          <span>New Chat</span>
        </div>
      </div>

      <div
        className="bg-search-input-container-background 
      h-full flex-auto overflow-auto custom-scrollbar"
      >
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lg" />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search contacts"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />
            </div>
          </div>
        </div>
        {Object.keys(allContacts).length > 0 ? (
          Object.entries(allContacts).map(([initialLetter, userList]) => (
            <div key={initialLetter} className="">
              <div className="text-teal-light pl-10 py-5">{initialLetter}</div>
              {
                userList.map((contact) => {
                  return (
                    <ChatListItem
                    data={contact}
                    isContactPage={true}
                    key={contact.id}
                    />
                  )
                })
              }
            </div>
          ))
        ) : (
          <div className="text-white text-center pt-5">No contacts found</div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;
