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

allYears.forEach((year, yIndex) => {
    const _yearName = year.querySelector(".year-name").textContent;
    if (!yIndex == 0) {
        year.classList.add("d-none");
        yearName.textContent = _yearName;
    }

    const monthNavigator = year.querySelector("#month-navigator");
    const monthName = monthNavigator.querySelector(".month");
    const nextMonthBtn = monthNavigator.querySelector(".next-month-btn");
    const preMonthBtn = monthNavigator.querySelector(".previous-month-btn");

    const allMonths = year.querySelectorAll(".month-calender");

    allMonths.forEach((month, mIndex) => {
        let _monthName = month.querySelector(".month-name").textContent;
        if (!mIndex == 0) {
            month.classList.add("months-display-manage");
            monthName.textContent = _monthName;
        }
    });
});

function nextYear() {
    console.log("next year");
}

function previousYear() {
    console.log("previous year");
}

preYearBtn.addEventListener("click", previousYear);
nextYearBtn.addEventListener("click", nextYear);
