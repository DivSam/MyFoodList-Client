"use client";

import { useState } from 'react';
import { FaMapMarkerAlt, FaRegCalendarAlt, FaRegChartBar, FaListUl } from 'react-icons/fa';

interface TabsProps {
    changeTab: (tab: string) => void;
}

export default function Tabs(props: TabsProps) {
    const [activeTab, setActiveTab] = useState("");

    return ( 
        <div className="border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                    <a onClick={() => {props.changeTab("list"); setActiveTab("list")}} className={ activeTab == "list" ? styles.cssTitleActive : styles.cssTitleDefault}>
                        <FaListUl className={ activeTab == "list" ? styles.cssIconActive : styles.cssIconDefault} />
                        My Food List
                    </a>
                </li>
                <li className="mr-2">
                    <a onClick={() => {props.changeTab("overallList"); setActiveTab("overallList")}} className={ activeTab == "overallList" ? styles.cssTitleActive : styles.cssTitleDefault}>
                        <FaListUl className={ activeTab == "overallList" ? styles.cssIconActive : styles.cssIconDefault} />
                        Overall Food List
                    </a>
                </li>
                <li className="mr-2">
                    <a onClick={() => {props.changeTab("map"); setActiveTab("map")}} className={ activeTab == "map" ? styles.cssTitleActive : styles.cssTitleDefault}>
                        <FaMapMarkerAlt className={ activeTab == "map" ? styles.cssIconActive : styles.cssIconDefault} />
                        Map View
                    </a>
                </li>
                <li className="mr-2">
                    <a onClick={() => {props.changeTab("calendar"); setActiveTab("calendar")}} className={ activeTab == "calendar" ? styles.cssTitleActive : styles.cssTitleDefault}>
                        <FaRegCalendarAlt className={ activeTab == "calendar" ? styles.cssIconActive : styles.cssIconDefault} />
                        Calendar View
                    </a>
                </li>
                <li className="mr-2">
                    <a onClick={() => {props.changeTab("bar"); setActiveTab("bar")}} className={ activeTab == "bar" ? styles.cssTitleActive : styles.cssTitleDefault}>
                        <FaRegChartBar className={ activeTab == "bar" ? styles.cssIconActive : styles.cssIconDefault} />
                        Bar Plot
                    </a>
                </li>
                
            </ul>
        </div>
    )
}

const styles = {
    cssTitleDefault: "inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 group",
    cssTitleActive: "inline-flex p-4 border-b-2 rounded-t-lg text-gray-600 border-gray-300 group",
    cssIconDefault: "w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500",
    cssIconActive: "w-4 h-4 mr-2 text-gray-500"
}