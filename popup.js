$(function () {
  chrome.storage.sync.get(["limit", "total"], function (budget) {
    $("#total").text(budget.total);
    $("#limit").text(budget.limit);
  });

  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      var notificationOptions = {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Total reset",
        message: "Total has been reset to 0!",
      };
      chrome.notifications.create("limitNotification", notificationOptions);
    });
  });

  $("#spendAmount").click(function () {
    chrome.storage.sync.get(["total", "limit"], function (budget) {
      var newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }
      var amount = $("#amount").val();
      if (amount) {
        newTotal += parseInt(amount);
      }
      chrome.storage.sync.set({ total: newTotal }, function () {
        if (amount && newTotal >= budget.limit) {
          var notificationOptions = {
            type: "basic",
            iconUrl: "icon48.png",
            title: "Limit reached",
            message: "Uh oh! Looks like you've exceeded your limit",
          };
          chrome.notifications.create("limitNotification", notificationOptions);
        }
      });
      $("#total").text(newTotal);
      $("#amount").val("");
    });
  });
});
