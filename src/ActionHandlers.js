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
 * Collection of functions to handle user interactions with the add-on.
 *
 * @constant
 */
var ActionHandlers = {
  /**
   * Displays the linkedin search card.
   *
   * @param {Event} e - Event from Gmail
   * @return {UniversalActionResponse}
   */
  showLIForm: function(e) {
    var settings = getSettingsForUser();
    var message = getCurrentMessage(e);
    var emails = extractRecipients(message, settings.emailBlacklist);
    var opts = {
      names: extractNames(emails),
      location: defaultLocation,
      company: extractLocation(emails),
    };
    var card = buildLICard(opts);
    return [card];
  },
};
