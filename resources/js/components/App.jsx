import React, { memo } from "react";
import { FormProvider } from "../contexts/FormContext";
import useCityStore from "../stores/cityStore";
import Header from "./Header";
import Chart from "./Chart/Chart";
import Footer from "./Footer";
import Notification from "./UI/Notification";
import KeyboardShortcutsPopup from "./UI/KeyboardShortcutsPopup";
import { Tags, PopularCities, Form } from "./Form";
import "./Form/Form.scss";

function App() {
    const isIntroMode = useCityStore((state) => state.isIntroMode());

    return (
        <FormProvider>
            <div className="app">
                <Header />
                <main className={`main ${isIntroMode ? "no-scroll" : ""}`}>
                    <div
                        className={`form-container ${
                            isIntroMode ? "intro" : "in-use"
                        }`}
                    >
                        <Tags />
                        <Form />
                        <PopularCities />
                    </div>
                    <Chart />
                </main>
                <Footer />
                <Notification />
                <KeyboardShortcutsPopup />
            </div>
        </FormProvider>
    );
}

export default memo(App);
