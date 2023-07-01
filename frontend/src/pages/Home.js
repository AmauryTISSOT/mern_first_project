import React from 'react';
import { useEffect, useState } from 'react';

// components
import WorkoutsDetails from '../components/WorkoutsDetails';

const Home = () => {

    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if (response.ok) {
                setWorkouts(json);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className='Home'>
            {workouts && workouts.map((workout) => (
                <WorkoutsDetails key={workout._id} workout={workout} />
            ))}
        </div>
    );
};

export default Home;