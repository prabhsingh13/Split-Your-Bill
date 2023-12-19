let itemCount = 1; // Initialize item count

        function addItems() {
            // Create a new div with the specified HTML content
            const newItemHTML = `
        <div class="d-flex justify-content-center align-items-center">
            <div class="mb-3 col-md-4">
                <label class="form-label"><strong>Item <span id="itemcount">${itemCount}</span> Amount (in ₹)</strong></label>
            </div>
            <div class="mb-3 col-md-8">
                <input type="number" class="form-control" id="itemvalue${itemCount}" onkeyup="splitBill()">
            </div>
        </div>
    `;

            // Create a new div element
            const newItem = document.createElement('div');

            // Set the inner HTML of the new div
            newItem.innerHTML = newItemHTML;

            // Append the new div to the addItemCol div
            document.getElementById('addItemCol').appendChild(newItem);

            // Increment item count for the next item
            itemCount++;
        }

        function splitBill() {
            // Collect values for all added items
            const itemValues = [];
            for (let i = 1; i <= itemCount; i++) {
                const itemValueElement = document.getElementById(`itemvalue${i}`);

                // Check if the element exists before accessing its value
                if (itemValueElement) {
                    const itemValue = itemValueElement.value;
                    itemValues.push(parseFloat(itemValue) || 0); // Convert to float or default to 0
                }
            }

            // Calculate total bill amount
            const totalBill = itemValues.reduce((sum, value) => sum + value, 0);

            // Update total bill input
            document.getElementById('total-bill').value = totalBill;

            // Get the number of persons
            const noOfPersons = parseFloat(document.getElementById('noOfPersons').value) || 1; // Default to 1 if not a valid number

            // Calculate and update amount to be split per person
            const share = totalBill / noOfPersons;
            document.getElementById('share').value = share.toFixed(2); // Display up to two decimal places
        }