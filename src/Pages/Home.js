import React,{useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { Carousel } from 'flowbite-react';


const Home = () => {
  const isAuthenticated = !!localStorage.getItem('refresh_token');
  const [user, setUser] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 5000);

    return () => clearInterval(interval);

    const fetchUser = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return;

      try {
        const response = await fetch('/authenticated_user/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.status === 401) {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) return;

          const refreshResponse = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
          });

          if (refreshResponse.ok) {
            const newAccessToken = await refreshResponse.json();
            localStorage.setItem('access_token', newAccessToken.access);
            fetchUser();
          }
        } else {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    const accessToken = localStorage.getItem('refresh_token');
    if (accessToken) {
      console.log('Access Token:', accessToken);
    }

    fetchUser();
  }, []);


  return (
    <>
      {isAuthenticated ? (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel activeIndex={activeIndex} onSelect={() => {}}>
            <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
            <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
          </Carousel>
          <p>{user && <h1>Welcome, {user.first_name} {user.last_name}</h1>}
          </p>
        </div>
      ) : (
        <div>
          <div className="bg-white">
            <div className="mx-auto max-w-7xl sm:px-6 sm:py-14 lg:px-8">
              <div className="relative isolate overflow-hidden bg-gray-900 px-6 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg
                  viewBox="0 0 1024 1024"
                  className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                  aria-hidden="true"
                >
                  <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                  <defs>
                    <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                      <stop stopColor="#7775D6" />
                      <stop offset={1} stopColor="#E935C1" />
                    </radialGradient>
                  </defs>
                </svg>
                <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Boost your productivity.
                    <br />
                    Start using our app today.
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                    <Link to="/login"
                      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Get started
                    </Link>
                    <Link to="/about" className="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </div>


                  {/* < className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">About</> */}

                </div>
                <div className="relative mt-16 h-80 lg:mt-8">
                  <img
                    className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                    src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                    alt="App screenshot"
                    width={1824}
                    height={1080}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
