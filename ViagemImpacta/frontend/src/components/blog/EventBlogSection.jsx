

import React from 'react';
import { eventData } from '../data/events';
import { CalendarDaysIcon } from '@heroicons/react/24/solid'; // Importando o ícone de calendário

const EventBlogSection = () => {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
                    Nossos Eventos Especiais
                </h2>
                <div className="space-y-16">
                    {eventData.map((event, index) => (
                        <div
                            key={event.id}
                            className={`flex flex-col md:flex-row items-center gap-8
                                        ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
                                        bg-white rounded-xl shadow-2xl p-8 transform transition-transform duration-300 hover:scale-[1.01]`}
                        >
                            <div className="md:w-1/2 flex-shrink-0"> 
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-auto object-cover rounded-lg shadow-xl" 
                                />
                            </div>
                            <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left">
                                <h3 className="text-4xl font-extrabold text-blue-800 mb-4 leading-tight">{event.title}</h3> 
                                
                                
                                <p className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full mb-4 self-center md:self-start">
                                    <CalendarDaysIcon className="h-4 w-4 mr-2" /> 
                                    {event.date}
                                </p>

                               
                                <p className="text-gray-700 text-lg leading-relaxed mb-6"> 
                                    {event.description}
                                </p>
                              
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventBlogSection;