import React from "react";
import Container from "../container";
import CreateForm from "../forms/create-form";
import ToggleThemeButton from "../toggle-theme-button";

const Header = ({ refreshData, session }) => {
    return (
        <header className="bg-mobile-light dark:bg-mobile-dark sm:bg-desktop-light sm:dark:bg-desktop-dark bg-cover bg-center min-h-[200px] sm:min-h-[300px]">
            <Container>
                <div className="flex justify-between mb-5 sm:mb-10">
                    <h1 className="text-xl sm:text-3xl text-white font-bold tracking-[0.625rem]">TODO</h1>
                    <ToggleThemeButton />
                </div>
                {session ? <CreateForm refreshData={refreshData} /> : <p className="text-center">A Simple Todo App</p>}
            </Container>
        </header>
    );
};

export default Header;
