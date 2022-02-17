import React, { useEffect, useState } from 'react';
import axios from "axios";

const Book = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    const getData = async () => {
        setIsLoading(true);
        await axios.get("https://bookget20220214130848.azurewebsites.net/api/Book/GetBook")
            .then(res => {
                console.log(res)
                setIsLoading(false);
                setData(res.data);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    // if (!data) return null;

    return (
        <div className="container mx-auto mt-10 pb-10">
            <div className="max-w-md md:max-w-xl bg-indigo-50 mx-auto rounded-md drop-shadow-lg pb-4">
                {data && (
                    <>
                        <div className="flex flex-col sm:flex-row gap-1">
                            <img src={data.imageUrl}
                                alt="Книга"
                                className="sm:mr-4 rounded-tl-md max-w-sm self-center"
                            />
                            <div className="px-4 md:px-0">
                                <h2 className="font-bold mt-4 text-2xl">{data.title}</h2>
                                <div className="mt-4">
                                    <p>Год написания: {data.date}</p>
                                    <p>Автор: {data.authors}</p>
                                    <p>Жанры: {data.categories}</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-5">
                            <h2 className="font-bold text-xl">Описание</h2>
                            <p className="font-medium mt-2">{data.description}</p>
                        </div>
                    </>
                )}
                <div className="pt-4 w-full flex justify-center">
                    <button onClick={getData} type="button" className="bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-700 outline focus:outline-indigo-700/50 py-3 px-4 rounded-md text-white font-medium text-sm flex">
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Загрузка
                            </>
                        ) : (
                            "Найти новую книгу"
                        )}

                    </button>
                </div>
            </div>
        </div>
    );
};

export default Book;
