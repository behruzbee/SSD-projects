import React from 'react';

export const NoInternetComponent = () => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>:(</h1>
                </div>
                <div className="noInternetTextWrapper">
                    <h2>Вы оффлайн!</h2>
                    <p>
                        Пожалуйста проверьте свой интернет. После того как вы
                        будете
                        <br />
                        онлайн, вы сможете использовать систему!
                    </p>
                </div>
            </div>
        </div>
    );
};
