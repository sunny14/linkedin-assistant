// Copyright 2017 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Builds a card that displays the search options for linkedin search.
 *
 * @param {Object} opts Parameters for building the card
 * @param {number} opts.durationMinutes - Default meeting duration in minutes
 * @param {number} opts.startHour - Default start of workday, as hour of day (0-23)
 * @param {number} opts.endHour - Default end of workday, as hour of day (0-23)
 * @param {string[]} opts.emailAddresses - Email addresses of participants
 * @param {Object} opts.state - State to pass on to subsequent actions
 * @return {Card}
 */
function buildLICard(opts) {
  var participantSection = CardService.newCardSection().setHeader(
      'Choose a person or number of persons'
  );

  var checkboxGroup = CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.CHECK_BOX)
      .setFieldName('participants');
  _.each(opts.emailAddresses, function(email) {
    checkboxGroup.addItem(email, email, true);
  });
  participantSection.addWidget(checkboxGroup);

  participantSection.addWidget(
      CardService.newButtonSet().addButton(
          CardService.newTextButton()
              .setText('Find in LinkedIn')
              .setOpenLink(CardService.newOpenLink().setUrl('https://www.linkedin.com/')
              )
      )
  );
  return CardService.newCardBuilder()
      .setHeader(CardService.newCardHeader().setTitle('Who would you like to check @ LinkedIn?'))
      .addSection(participantSection)
      .build();
}

/**
 * Builds a card that displays details of an error.
 *
 * @param {Object} opts Parameters for building the card
 * @param {Error} opts.exception - Exception that caused the error
 * @param {string} opts.errorText - Error message to show
 * @param {boolean} opts.showStackTrace - True if full stack trace should be displayed
 * @return {Card}
 */
function buildErrorCard(opts) {
  var errorText = opts.errorText;

  if (opts.exception && !errorText) {
    errorText = opts.exception.toString();
  }

  if (!errorText) {
    errorText = 'No additional information is available.';
  }

  var card = CardService.newCardBuilder();
  card.setHeader(
      CardService.newCardHeader().setTitle('An unexpected error occurred')
  );
  card.addSection(
      CardService.newCardSection().addWidget(
          CardService.newTextParagraph().setText(errorText)
      )
  );

  if (opts.showStackTrace && opts.exception && opts.exception.stack) {
    var stack = opts.exception.stack.replace(/\n/g, '<br/>');
    card.addSection(
        CardService.newCardSection()
            .setHeader('Stack trace')
            .addWidget(CardService.newTextParagraph().setText(stack))
    );
  }

  return card.build();
}

