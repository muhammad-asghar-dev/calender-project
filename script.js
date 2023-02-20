"use strict";

console.log("JavaScript File attached!");

const allProjects = document.querySelectorAll(".project-calender-container");

allProjects.forEach((project) => {
    const title = project.querySelector(".project-title");
    let subOptCheck = false;
    title.addEventListener("click", () => {
        allProjects.forEach((elem) => {
            if (elem === project) {
                project.classList.toggle("opened");
            } else {
                // elem.classList.remove("opened");
            }
            closeAlloptions();
            if (subOptCheck) closeAllSubOptions();
        });
    });

    const allOptions = project.querySelectorAll(
        ".project-details-container > .project-details-category"
    );

    const closeAlloptions = () =>
        allOptions.forEach((elem) => elem.classList.remove("opened"));

    let allOpts;

    allOptions.forEach((options) => {
        const optTitle = options.querySelector(".proj-dtl-cate-title > div");

        allOpts = options.children[1].children;
        subOptCheck = true;
        for (let j = 0; j < allOpts.length; j++) {
            const opt = allOpts[j];
            if (opt.classList.contains("sub-opts-option")) {
                let subTitle = opt.children[0];
                let subOpts = opt.children[1];

                subTitle.addEventListener("click", () => {
                    for (let s = 0; s < allOpts.length; s++) {
                        const minOpt = allOpts[s];
                        if (minOpt.classList.contains("sub-opts-option")) {
                            if (minOpt === opt) {
                                minOpt.classList.toggle("opened");
                            } else {
                                // minOpt.classList.remove("opened");
                            }
                        }
                    }
                });
            }
        }

        optTitle.addEventListener("click", () => {
            allOptions.forEach((elem) => {
                if (elem === options) {
                    options.classList.toggle("opened");
                    closeAllSubOptions();
                } else {
                    // elem.classList.remove("opened");
                }
            });
        });
    });

    const closeAllSubOptions = () => {
        for (let j = 0; j < allOpts.length; j++) {
            const opt = allOpts[j];
            if (opt.classList.contains("sub-opts-option")) {
                opt.classList.remove("opened");
            }
        }
    };
});

// Calenders

const allYears = document.querySelectorAll(
    ".calenders-container > .year-calender"
);

const yearNavigation = document.getElementById("year-navigation");
const preYearBtn = yearNavigation.querySelector(".previous-year-btn");
const nextYearBtn = yearNavigation.querySelector(".next-year-btn");
const yearName = yearNavigation.querySelector(".year");

const monthNavigation = document.getElementById("month-navigator");
const preMonthBtn = monthNavigation.querySelector(".previous-month-btn");
const nextMonthBtn = monthNavigation.querySelector(".next-month-btn");
const monthName = monthNavigation.querySelector(".month");

let curYear = 0;
let curMonth = 0;

preYearBtn.disabled = true;
preMonthBtn.disabled = true;

if (!allYears[curYear + 1]) nextYearBtn.disabled = true;

allYears.forEach((year, yIndex) => {
    const allMonths = year.querySelectorAll(".month-calender");
    if (yIndex === 0) {
        const _yearName = year.querySelector(".year-name").textContent;
        yearName.textContent = _yearName;

        const _monthName =
            allMonths[0].querySelector(".month-name").textContent;
        monthName.textContent = _monthName;
    } else {
        year.classList.add("d-none");
    }

    year.querySelector(".year-name").classList.add("d-none");

    allMonths.forEach((month, mIndex) => {
        if (!mIndex == 0) month.classList.add("months-display-manage");
    });
});

function navigateYear(action) {
    const isNext = action === "N" ? true : false;

    curMonth = 0;
    allYears.forEach((year, index) => {
        const allMonths = year.querySelectorAll(".month-calender");
        for (let i = 0; i < allMonths.length; i++) {
            const month = allMonths[i];
            if (i == 0) {
                month.classList.remove("months-display-manage");
            } else {
                if (!month.classList.contains("months-display-manage"))
                    month.classList.add("months-display-manage");
            }
        }
        if (index === curYear) {
            const _monthName = year.querySelector(".month-name").textContent;
            monthName.textContent = _monthName;
        }
    });
    preMonthBtn.disabled = true;
    nextMonthBtn.disabled = false;

    for (let i = 0; i < allYears.length; i++) {
        if (i === curYear) {
            const cY = allYears[i];
            cY.classList.add("d-none");

            const nY = allYears[isNext ? i + 1 : i - 1];
            nY.classList.remove("d-none");

            const _yearName = nY.querySelector(".year-name").textContent;
            yearName.textContent = _yearName;

            if (isNext) {
                if (!allYears[i + 2]) nextYearBtn.disabled = true;
                preYearBtn.disabled = false;
                curYear++;
            } else {
                if (!allYears[i - 2]) preYearBtn.disabled = true;
                nextYearBtn.disabled = false;
                curYear--;
            }
            break;
        }
    }
}

function navigateMonth(action) {
    const isNext = action === "N" ? true : false;
    const cYear = allYears[curYear];
    const allMonths = cYear.querySelectorAll(".month-calender");

    const month = allMonths[curMonth];
    if (!month.classList.contains("months-display-manage")) {
        month.classList.add("months-display-manage");

        const cM = allMonths[isNext ? curMonth + 1 : curMonth - 1];

        cM.classList.remove("months-display-manage");

        const _monthName = cM.querySelector(".month-name").textContent;
        monthName.textContent = _monthName;

        if (isNext) {
            if (!allMonths[curMonth + 2]) nextMonthBtn.disabled = true;
            preMonthBtn.disabled = false;
            curMonth++;
        } else {
            if (!allMonths[curMonth - 2]) preMonthBtn.disabled = true;
            nextMonthBtn.disabled = false;
            curMonth--;
        }
    }
}

preYearBtn.addEventListener("click", () => navigateYear("P"));
nextYearBtn.addEventListener("click", () => navigateYear("N"));

preMonthBtn.addEventListener("click", () => navigateMonth("P"));
nextMonthBtn.addEventListener("click", () => navigateMonth("N"));
