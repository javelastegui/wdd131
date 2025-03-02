document.addEventListener("DOMContentLoaded", function () {
  let participantCount = 1;
  const addButton = document.getElementById("add");
  const form = document.querySelector("form");
  const summarySection = document.getElementById("summary");

  addButton.addEventListener("click", function () {
    participantCount++;
    const newParticipantHTML = participantTemplate(participantCount);
    addButton.insertAdjacentHTML("beforebegin", newParticipantHTML);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const feeTotal = totalFees();
    const adultName = document.getElementById("adult_name").value;
    form.style.display = "none";
    summarySection.innerHTML = successTemplate({
      name: adultName,
      count: participantCount,
      fee: feeTotal,
    });
  });
});

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}"> First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>
      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select id="grade${count}" name="grade${count}">
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  const total = feeElements.reduce((sum, input) => {
    return sum + (parseFloat(input.value) || 0);
  }, 0);
  return total;
}

function successTemplate(info) {
  return `<h2>Registration Successful!</h2>
          <p>Thank you ${info.name} for registering. You have registered ${info.count} participant(s) and owe $${info.fee} in Fees.</p>`;
}
