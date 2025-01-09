import React from 'react';

const companies = [
    {
        name: 'Microsoft',
        logo: 'https://www.microsoft.com/favicon.ico',
    },
    {
        name: 'Google',
        logo: 'https://www.google.com/favicon.ico',
    },
    {
        name: 'Meta',
        logo: 'https://cdn-icons-png.flaticon.com/256/6033/6033716.png',
    },
    {
        name: 'Apple',
        logo: 'https://www.apple.com/favicon.ico',
    },
    {
        name: 'Amazon',
        logo: 'https://www.amazon.com/favicon.ico',
    }
];

const ImageSlider = () => {
    return (
        <div className="w-full h-24 overflow-hidden bg-gray-50 flex items-center">
            <div
                className="flex w-max"
                style={{
                    animation: 'slide 15s linear infinite',
                    display: 'flex',
                }}
            >
                {companies.map((company, index) => (
                    <div
                        key={`first-${index}`}
                        className="w-[150px] flex-shrink-0 flex items-center justify-center"
                    >
                        <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="h-12 w-auto object-contain"
                        />
                    </div>
                ))}
                {/* Duplicate Set for Loop */}
                {companies.map((company, index) => (
                    <div
                        key={`second-${index}`}
                        className="w-[150px] flex-shrink-0 flex items-center justify-center"
                    >
                        <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="h-12 w-auto object-contain"
                        />
                    </div>
                ))}
            </div>
            <style>
                {`
                @keyframes slide {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default ImageSlider;
