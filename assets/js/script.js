// variable to store and loop through scheduler
var myDay = [
    {
        id: "0",
        hour: "9am",
        time: "09",
        task: ""
    },
    {
        id: "1",
        hour: "10am",
        time: "10",
        task: ""
    },
    {
        id: "2",
        hour: "11am",
        time: "11",
        task: ""
    },
    {
        id: "3",
        hour: "12pm",
        time: "12",
        task: ""
    },
    {
        id: "4",
        hour: "1pm",
        time: "13",
        task: ""
    },
    {
        id: "5",
        hour: "2pm",
        time: "14",
        task: ""
    },
    {
        id: "6",
        hour: "3pm",
        time: "15",
        task: ""
    },
    {
        id: "7",
        hour: "4pm",
        time: "16",
        task: ""
    },
    {
        id: "8",
        hour: "5pm",
        time: "17",
        task: ""
    },
  
  // The following is for testing purposes. Uncomment to be able to test after 5pm daily
    // {
    //     id: "9",
    //     hour: "6pm",
    //     time: "18",
    //     task: ""
    // },
    // {
    //     id: "10",
    //     hour: "7pm",
    //     time: "19",
    //     task: ""
    // },
    // {
    //     id: "11",
    //     hour: "8pm",
    //     time: "20",
    //     task: ""
    // },
    // {
    //     id: "12",
    //     hour: "9pm",
    //     time: "21",
    //     task: ""
    // },
    // {
    //     id: "13",
    //     hour: "10pm",
    //     time: "22",
    //     task: ""
    // },
    // {
    //     id: "14",
    //     hour: "11pm",
    //     time: "23",
    //     task: ""
    // },
    // {
    //     id: "15",
    //     hour: "12am",
    //     time: "24",
    //     task: ""
    // },
    
]

// gets data for the header date
var getHeaderDate = function() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// saves data to localStorage
var saveTasks = function() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

// sets any data in localStorage to the view
var displayTasks = function() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.task);
    })
}

// sets any existing localStorage data to the view if it exists
var init = function() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay){
        myDay = storedDay;
    }
    else{
        displayTasks();
    }
    saveTasks();
    displayTasks();
}

// loads header date
getHeaderDate();

// creates styled body
myDay.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}`)
        .attr({
            "class": "col-1 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-10 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);

    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // creates save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after components created
init();

// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var updatedTask = $(this).siblings(".description").children(".future, .present").attr("id");
    myDay[updatedTask].task = $(this).siblings(".description").children(".future, .present").val();
    saveTasks();
})