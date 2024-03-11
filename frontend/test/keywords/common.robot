*** Settings ***
Library                 Browser
Library                 FakerLibrary        locale=en_IN
Library                 String
Library                 DateTime

*** Variables ***
${BROWSER}              chromium
${HEADLESS}             ${False}
${BROWSER_TIMEOUT}      6 seconds
${SHOULD_TIMEOUT}       0.1 seconds

${URL_DEFAULT}          %{HOST_ADDRESS=http://localhost:4000}
${STATE}                Evaluate  json.loads("""{}""")  json

# Admin's default information #
${name_admin}           May Rodriguez PhD
${email_admin}          admin@admin.com
${phone_admin}          053702170206
${password_admin}       Password1!
${new_password}         Password1#

*** Keywords ***
Login to admin
  Enter "email" in "Tên đăng nhập" with "admin@admin.com"
  Enter "text" in "Mật khẩu" with "Password1!"
  Click "Đăng nhập" button
  User look message "Thành công" popup

#### Setup e Teardown
Setup
  Set Browser Timeout         ${BROWSER_TIMEOUT}
  New Browser                 ${BROWSER}  headless=${HEADLESS}
  New Page                    ${URL_DEFAULT}
  ${STATE}                    Evaluate  json.loads("""{}""")  json
Tear Down
  Close Browser               ALL

Wait Until Element Is Existent
  [Arguments]               ${locator}  ${message}=${EMPTY}   ${timeout}=${BROWSER_TIMEOUT}
  Wait For Elements State   ${locator}  attached              ${timeout}                    ${message}

Wait Until Element Is Visible
  [Arguments]               ${locator}  ${message}=${EMPTY}   ${timeout}=${BROWSER_TIMEOUT}
  Wait For Elements State   ${locator}  visible              ${timeout}                     ${message}

Wait Until Page Does Not Contain Element
  [Arguments]               ${locator}  ${message}=${EMPTY}   ${timeout}=${BROWSER_TIMEOUT}
  Wait For Elements State   ${locator}  detached              ${timeout}                    ${message}

Element Should Be Exist
  [Arguments]               ${locator}  ${message}=${EMPTY}   ${timeout}=${SHOULD_TIMEOUT}
  Wait For Elements State   ${locator}  attached              ${timeout}                    ${message}

Element Should Be Visible
  [Arguments]               ${locator}  ${message}=${EMPTY}   ${timeout}=${SHOULD_TIMEOUT}
  Wait For Elements State   ${locator}  visible               ${timeout}                    ${message}

Element Text Should Be
  [Arguments]               ${locator}  ${expected}           ${message}=${EMPTY}           ${ignore_case}=${EMPTY}
  Get Text                  ${locator}  equal                 ${expected}                   ${message}

Element Should Not Be Visible
  [Arguments]               ${locator}  ${message}=${EMPTY}   ${timeout}=${SHOULD_TIMEOUT}
  Wait For Elements State   ${locator}  hidden                ${timeout}                    ${message}

Check Text
  [Arguments]               ${text}
  ${containsS}=             Get Regexp Matches                ${text}                      _@(.+)@_                   1
  ${cntS}=                  Get length                        ${containsS}
  IF  ${cntS} > 0
    ${text}=                Set Variable                      ${STATE["${containsS[0]}"]}
  END
  RETURN    ${text}

###  -----  Form  -----  ###
Get Random Text
  [Arguments]               ${type}                           ${text}
  ${symbol}                 Set Variable                      _RANDOM_
  ${new_text}               Set Variable
  ${containsS}=             Get Regexp Matches                ${text}                       _@(.+)@_                   1
  ${cntS}=                  Get length                        ${containsS}
  ${contains}=              Get Regexp Matches                ${text}                       ${symbol}
  ${cnt}=                   Get length                        ${contains}
  IF  ${cntS} > 0
    ${new_text}=            Set Variable                      ${STATE["${containsS[0]}"]}
    ${symbol}=              Set Variable                      _@${containsS[0]}@_
  ELSE IF  ${cnt} > 0 and "${type}" == "test name"
    ${random}=              FakerLibrary.Sentence             nb_words=3
    ${words}=               Split String                      ${TEST NAME}                  ${SPACE}
    ${new_text}=            Set Variable                      ${words[0]} ${random}
  ELSE IF  ${cnt} > 0 and "${type}" == "number"
    ${new_text}=            FakerLibrary.Random Int
    ${new_text}=            Convert To String                 ${new_text}
  ELSE IF  ${cnt} > 0 and "${type}" == "percentage"
    ${new_text}=            FakerLibrary.Random Int           max=100
    ${new_text}=            Convert To String                 ${new_text}
  ELSE IF  ${cnt} > 0 and "${type}" == "paragraph"
    ${new_text}=            FakerLibrary.Paragraph
  ELSE IF  ${cnt} > 0 and "${type}" == "email"
    ${new_text}=            FakerLibrary.Email
  ELSE IF  ${cnt} > 0 and "${type}" == "phone"
    ${new_text}=            FakerLibrary.Random Int           min=200000000                 max=999999999
    ${new_text}=            Convert To String                 ${new_text}
    ${new_text}=            Catenate                          SEPARATOR=                    0                           ${new_text}
  ELSE IF  ${cnt} > 0 and "${type}" == "color"
    ${new_text}=            FakerLibrary.Safe Hex Color
  ELSE IF  ${cnt} > 0 and "${type}" == "password"
    ${new_text}=            FakerLibrary.Password            10                             True                        True                          True                        True
  ELSE IF  ${cnt} > 0 and "${type}" == "date"
    ${new_text}=            FakerLibrary.Date  	              pattern=%d-%m-%Y
  ELSE IF  ${cnt} > 0 and "${type}" == "word"
    ${new_text}=            FakerLibrary.Sentence             nb_words=1
  ELSE IF  ${cnt} > 0 and "${type}" == "otp"
    ${new_text}=            FakerLibrary.Random Int           min=100000                    max=999999
    ${new_text}=            Convert To String                 ${new_text}
  ELSE IF  ${cnt} > 0
    ${new_text}=            FakerLibrary.Sentence
  END
    ${cnt}=                 Get Length                        ${text}
  IF  ${cnt} > 0
    ${text}=                Replace String                    ${text}                       ${symbol}                   ${new_text}
  END
  RETURN    ${text}

Get Element Form Item By Name
  [Arguments]               ${name}                           ${xpath}=${EMPTY}
  RETURN                  xpath=//*[contains(@class, "ant-form-item-label")]/label[text()="${name}"]/../../*[contains(@class, "ant-form-item")]${xpath}

Required message "${text}" displayed under "${name}" field
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-form-item-explain-error")]
  Element Text Should Be    ${element}                        ${text}

Enter "${type}" in "${name}" with "${text}"
  Wait Until Element Spin
  ${text}=                  Get Random Text                   ${type}                       ${text}
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-input")]
  Click                     ${element}
  Clear Text                ${element}
  Fill Text                 ${element}                        ${text}                       True
  Fill Text               ${element}                        ${text}
  ${condition}=           Get Text                          ${element}
  Scroll To Element         ${element}
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable     \${STATE["${name}"]}              ${text}
  END

Enter "${type}" in editor "${name}" with "${text}"
  Wait Until Element Spin
  ${text}=                  Get Random Text                   ${type}                       ${text}
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class,"sun-editor-editable")]
  Click                     ${element}
  Clear Text                ${element}
  Fill Text                 ${element}                        ${text}                       True
  ${elementS}=              Get Element Form Item By Name     ${name}                       //*[contains(@class,"sun-editor-editable")]/*[contains(text(),"${text}")]
  Wait Until Element Is Existent                              ${elementS}
  Sleep                     ${SHOULD_TIMEOUT}
  Fill Text               ${element}                        ${text}
  ${condition}=           Get Text                          ${element}
  Scroll To Element         ${element}
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable     \${STATE["${name}"]}              ${text}
  END
  Sleep                     0.3


Enter "${type}" in textarea "${name}" with "${text}"
  Wait Until Element Spin
  ${text}=                  Get Random Text                   ${type}                       ${text}
  ${element}=               Get Element Form Item By Name     ${name}                       //textarea
  Clear Text                ${element}
  Fill Text                 ${element}                        ${text}
  Fill Text               ${element}                        ${text}
  ${condition}=           Get Text                          ${element}
  Scroll To Element         ${element}
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
  Set Global Variable       \${STATE["${name}"]}              ${text}
  END

Enter date in "${name}" with "${text}"
  Wait Until Element Spin
  ${text}=                  Get Random Text                   date                          ${text}
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-picker-input")]/input
  Click                     ${element}
  Clear Text                ${element}
  Fill Text                 ${element}                        ${text}
  Fill Text               ${element}                        ${text}
  ${condition}=           Get Text                          ${element}
  Press Keys                ${element}                        Tab
  Press Keys                ${element}                        Tab
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
      Set Global Variable   ${STATE["${name}"]}               ${text}
  END

Enter "${type}" in placeholder "${placeholder}" with "${text}"
  Wait Until Element Spin
  IF    "${text}" == "today"
    ${text}=                Get Current Date                  local                         result_format=%d-%m-%Y
  ELSE
    ${text}=                   Get Random Text                   ${type}                       ${text}
  END
  ${element}=                Get Element                       (//input[contains(@placeholder, "${placeholder}")])[last()]
  Clear Text                 ${element}
  Fill Text                  ${element}                        ${text}
  Keyboard Key               press                             Enter
  ${cnt}=                    Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable      \${STATE["${placeholder}"]}       ${text}
  END

Enter date in placeholder "${name}" with "${date}"
  Wait Until Element Spin
  ${date}=                    Get Random Text                   date                        ${date}
  ${element}=                 Get Element                      //input[contains(@placeholder, "${name}")]
  Click                       ${element}
  Clear Text                  ${element}
  Fill Text                   ${element}                       ${date}                      True
  Keyboard Key                Press                            Enter
  ${cnt}=                     Get Length                       ${date}
  IF  ${cnt} > 0
    Set Global Variable       \${STATE["${name}"]}             ${name}
  END

Click select "${name}" with "${text}"
  ${text}=                  Get Random Text                   Text                          ${text}
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-select-show-arrow")]
  Click                     ${element}
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-select-selection-search-input")]
  Fill Text                                                   ${element}                    ${text}
  Click                     xpath=//*[contains(@class, "ant-select-item-option") and @title="${text}"]
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable     \${STATE["${name}"]}              ${text}
  END

Select file in "${name}" with "${text}"
  ${element}=               Get Element Form Item By Name     ${name}                       //input[@type = "file"]
  Upload File By Selector   ${element}                        test/upload/${text}
  Wait Until Image Is Uploaded

Click radio "${name}" in line "${text}"
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-radio-button-wrapper")]/span[contains(text(), "${text}")]
  Click                     ${element}

Click switch "${name}" to be activated
  ${element}=               Get Element Form Item By Name     ${name}                       //button[contains(@class, "ant-switch")]
  Click                     ${element}

Click tree select "${name}" with "${text}"
  ${text}=                  Get Random Text                   Text                          ${text}
  ${element}=               Get Element Form Item By Name     ${name}                       //*[contains(@class, "ant-tree-select")]
  Click                     ${element}
  Fill Text                 ${element}//input                 ${text}
  Click                     xpath=//*[contains(@class, "ant-select-tree-node-content-wrapper") and @title="${text}"]

Click assign list "${list}"
  ${words}=                 Split String                      ${list}                       ,${SPACE}
  FOR    ${word}    IN    @{words}
    Click                   xpath=//*[contains(@class, "ant-checkbox-wrapper")]/*[text()="${word}"]
  END
  Click                     xpath=//*[contains(@class, "ant-transfer-operation")]/button[2]


###  -----  Table  -----  ###
Get Element Item By Name
  [Arguments]               ${name}                           ${xpath}=${EMPTY}
  RETURN                  xpath=//*[contains(@class, "item-text") and contains(text(), "${name}")]/ancestor::*[contains(@class, "item")]${xpath}

Click on the "${text}" button in the "${name}" item line
  Wait Until Element Spin
  ${element}=               Get Element Item By Name          ${STATE["${name}"]}           //button[@title = "${text}"]
  Click                     ${element}
  Click Confirm To Action

Get Element Table Item By Name
  [Arguments]               ${name}                           ${xpath}
  RETURN                  xpath=//*[contains(@class, "ant-table-row")]//*[(text()="${name}")]/ancestor::tr${xpath}

Click on the "${text}" button in the "${name}" table line
  Sleep                     ${SHOULD_TIMEOUT}
  ${name}=                  Check Text                        ${name}
  ${element}=               Get Element Table Item By Name    ${name}                       //button[@title = "${text}"]
  Click                     ${element}
  # Sleep    0.2
  Click Confirm To Action

The status button in the "${name}" table line change to "${status}"
  ${name}=                  Check Text                        ${name}
  ${element}=               Set Variable                      //tbody//tr[contains(@class,"ant-table-row")]//*[contains(text(),"${name}")]//ancestor::tr//button[@title = "${status}"]
  Wait Until Element Is Existent                              ${element}

###  -----  Tree  -----  ###
Get Element Tree By Name
  [Arguments]               ${name}                           ${xpath}=${EMPTY}
  RETURN                    xpath=//*[contains(@class, "ant-tree-node-content-wrapper") and @title = "${name}"]//*[contains(@class, "group")]${xpath}

Click on "${name}" tree
  Wait Until Element Spin
  ${element}=               Get Element Tree By Name          ${name}
  Click                     ${element}

Click on the "${name}" tree to delete
  Wait Until Element Spin
  ${element}=               Get Element Tree By Name          ${STATE["${name}"]}
  Scroll To Element         ${element}
  Mouse Move Relative To    ${element}                        0
  Click                     ${element}//*[contains(@class, "la-trash")]
  Click Confirm To Action

Click on the "${name}" tree to edit
  Wait Until Element Spin
  ${element}=               Get Element Tree By Name          ${STATE["${name}"]}
  Click                     ${element}


###  -----  Element  -----  ###
Click "${text}" button
  Sleep                       ${SHOULD_TIMEOUT}
  ${cnt}=                     Get Element Count               //button[@title = "${text}"]
  IF    ${cnt} > 0
    Click                     xpath=//button[@title = "${text}"]
    Scroll By                 ${None}
  ELSE
    Click                     xpath=//button[text() = "${text}"]
    Scroll By                 ${None}
  END

# Click "${text}" tab button
#   Click                       //*[contains(@class, "ant-tabs-tab-btn") and contains(text(), "${text}")]

# Select on the "${text}" item line
#   Wait Until Element Spin
#   ${element}=               Get Element Item By Name          ${text}
#   Click                     ${element}

Select on the "${text}" item line
  Wait Until Element Spin
  ${element}=               Set Variable                      //*[contains(@class,"item")]/*[contains(@class,"item-text") and contains(.,"${text}")]
  Click                     ${element}

Click "${name}" menu
  Click                     xpath=//ul[@id="menu-sidebar"]//span[contains(text(),"${name}")]

Click "${text}" sub menu to "${url}"
  Wait Until Element Spin
  Click                     xpath=//a[contains(@class, "sub-menu") and descendant::span[contains(text(), "${text}")]]
  ${curent_url}=            Get Url
  Should Contain            ${curent_url}                     ${URL_DEFAULT}${url}

User look message "${message}" popup
  ${contains}=              Get Regexp Matches                ${message}                    _@(.+)@_                    1
  ${cnt}=                   Get length                        ${contains}
  IF  ${cnt} > 0
    ${message}=             Replace String                    ${message}                    _@${contains[0]}@_          ${STATE["${contains[0]}"]}
  END
  Element Text Should Be    id=swal2-html-container           ${message}
  ${element}=               Set Variable                      xpath=//button[contains(@class, "swal2-close")]
  ${passed}                 Run Keyword And Return Status
                            ...   Element Should Be Visible   ${element}
  IF    "${passed}" == "True"
        Click               ${element}
  END

Click Confirm To Action
  # ${element}                Set Variable                      //*[contains(@class, "ant-popover ant-popconfirm")]//*[contains(@class, "ant-btn-primary")]
  ${element}                Set Variable                      //*[contains(@class, "ant-popover")]//*[contains(@class, "ant-btn-primary")]
  ${count}=                 Get Element Count                 ${element}
  IF    ${count} > 0
    Click                   ${element}
    Sleep                   ${SHOULD_TIMEOUT}
  END
  ${element}=               Set Variable                      //*[contains(@class, "swal2-close")]
  ${passed}                 Run Keyword And Return Status
                            ...   Element Should Be Visible   ${element}
  IF    "${passed}" == "True"
        Click               ${element}
  END

Wait Until Image Is Uploaded
  ${element}                Set Variable                      //*[contains(@class,"animate-spin")]
  ${cnt}=                   Get Element Count                 ${element}
  IF    ${cnt} > 0
    Wait Until Page Does Not Contain Element                  ${element}
  END

Wait Until Element Spin
  Sleep                     ${SHOULD_TIMEOUT}
  ${element}                Set Variable                      xpath=//*[contains(@class, "ant-spin-spinning")]
  ${count}=                 Get Element Count                 ${element}
  IF    ${count} > 0
    Wait Until Page Does Not Contain Element                  ${element}
  END

### ----- NEW ----- ###
Click on eye icon in "${name}" field
  Wait Until Element Spin
  ${element}=                Get Element                       //label[@title="${name}"]//ancestor::div[contains(@class,"ant-row")]//div[contains(@class,"relative")]//*[@id="Layer_1"]
  Click                      ${element}

Click on cross icon in input search box
  Click                      //input[contains(@id,"input_search")]//following-sibling::*[contains(@id,"Layer_1")]

The hidden password in "${name}" field should be visibled as "${text}"
  ${text}=                  Check Text                         ${text}
  ${element}=               Get Element                        //*[contains(@class, "ant-form-item-label")]/label[text()="${name}"]/../../*[contains(@class, "ant-form-item")]//input
  Get Property              ${element}                         type                       ==                             text
  Get Text                  ${element}                         equal                      ${text}

Click on "${name}" tab
  ${text}                   Evaluate                           "${name}".lower()
  ${text2}                  Evaluate                           "${text}".capitalize()
  ${element}=               Set Variable                       //*[contains(@class,"ant-tabs")]//*[@role="tab" and text()="${text2}"]
  Click                     ${element}

Click "${name}" line in the avatar's account
  Wait Until Element Spin
  Click                     //section[contains(@id,"dropdown-profile")]//img
  Wait Until Element Spin
  ${element}=               Get Element                       //ul[contains(@class,"ant-dropdown-menu")]
  Click                     ${element}//div[text()="${name}"]
  Wait Until Element Spin

Click on cross icon in select "${name}"
  Wait Until Element Spin
  ${element}=               Get Element                       //*[contains(@class, "ant-form-item-label")]/label[text()="${name}"]//ancestor::div[contains(@class, "ant-row")][1]//span[contains(@class, "anticon-close-circle")]/*[1]
  Click                     ${element}


Click on cross icon inside image in "${name}"
  ${element}=               Get Element Form Item By Name     ${name}                       //button[contains(@class,"items-center")]//*[contains(@id,"Layer_1")]
  Click                     ${element}
  Click Confirm To Action

Click Cancel Action
  ${element}                Set Variable                       xpath=//*[contains(@class, "ant-popover")]//button[1]
  ${count}=                 Get Element Count                  ${element}
  IF    ${count} > 0
    Click                   ${element}
    Sleep                   ${SHOULD_TIMEOUT}
  END

Click "${text}" button with cancel action
  Click                     xpath=//button[@title = "${text}"]
  Click Cancel Action
  Scroll By                 ${None}

Click on the "${text}" button in the "${name}" table line with cancel
  Wait Until Element Spin
  ${name}=                  Check Text                         ${name}
  ${element}=               Get Element Table Item By Name     ${name}                    //button[@title = "${text}"]
  Click                     ${element}
  Click Cancel Action

Click "${type}" in "${name}" with "${text}"
  IF    "${text}" == "today"
    ${text}=                Get Current Date                  local                         result_format=%d-%m-%Y
  ELSE IF    "${text}" == "yesterday"
    ${text}=                Get Current Date                  local                         -1 day                                     result_format=%d-%m-%Y
  ELSE
    ${text}=                Get Random Text                   ${type}                       ${text}
  END
  ${element}=               Get Element Form Item By Name     ${name}                       //input
  Click                     ${element}
  Wait Until Keyword Succeeds                                 ${SHOULD_TIMEOUT}             ${SHOULD_TIMEOUT}     Fill Text             ${element}                  ${text}                       True
  ${d_text}=                Get Regexp Matches                ${text}                       (.+)-(..)-            1
  ${m_text}=                Get Regexp Matches                ${text}                       (..)-(..)-            2
  ${y_text}=                Get Regexp Matches                ${text}                       (..)-(..)-(.+)        3
  ${after_text}=            Catenate                          SEPARATOR=-                   ${y_text[0]}          ${m_text[0]}          ${d_text[0]}
  Click With Options        //td[@title = "${after_text}"]/div    force=True
  ${cnt}=                   Get Length                        ${text}
  IF  ${cnt} > 0
  Set Global Variable       ${STATE["${name}"]}               ${text}
  END

Data's information in "${name}" should be equal "${value}"
  Wait Until Element Spin
  ${value}=                 Check Text                         ${value}
  ${cnt}=                   Get Element Count                  //label[contains(@title,"${name}")]
  IF    ${cnt} > 0
    ${element}=             Set Variable                       //label[contains(@title,"${name}")]//ancestor::div[contains(@class,"ant-row")][1]//*[contains(@class,"sun-editor-editable")]
    ${cntS}=                Get Element Count                  ${element}
    IF    ${cntS} > 0
      Get Text              ${element}                         equal                       ${value}
    ELSE
      ${element}=           Set Variable                       //label[contains(@title,"${name}")]//ancestor::div[contains(@class,"ant-row")][1]//*[contains(@class,"ant-select-selection-item")]
      ${cnt2}=              Get Element Count                  ${element}
      IF    ${cnt2} > 0
        Get Text            ${element}                         equal                       ${value}
      ELSE
        ${element}=         Set Variable                       //label[contains(@title,"${name}")]//ancestor::div[contains(@class,"ant-row")][1]//*[contains(@class,"ant-picker-input")]/input
        ${cnt3}=            Get Element Count                  ${element}
        IF    ${cnt3} > 0
          Get Text            ${element}                       equal                       ${value}
        ELSE
          ${element}=       Set Variable                       //label[contains(@title,"${name}")]//ancestor::div[contains(@class,"ant-row")][1]//*[contains(@class,"ant-input")]
          Get Text          ${element}                         equal                       ${value}
        END
      END
    END
  END

Data's information should contain "${name}" field
  ${name_field}=            Check Text                         ${name}
  ${cnt}=                   Get Element Count                  //label[contains(@title,"${name}")]
  Should Be True            ${cnt} >= 1

Data's information in "${name}" should not be equal "${value}"
  Wait Until Element Spin
  ${value}=                 Check Text                         ${value}
  ${cnt}=                   Get Element Count                  //label[contains(@title,"${name}")]
  IF    ${cnt} > 0
    ${element}=             Set Variable                       //label[contains(@title,"${name}")]//ancestor::div[contains(@class,"ant-row")][1]//*[contains(@class,"ant-input")]
    ${cntS}=                Get Element Count                  ${element}
    IF    ${cntS} > 0
      Get Text              ${element}                         inequal                     ${value}
    ELSE
      ${element}=           Set Variable                       //label[contains(@title,"${name}")]//ancestor::div[contains(@class,"ant-row")][1]//*[contains(@class,"ant-select-selection-item")]
      Get Text              ${element}                         inequal                     ${value}
    END
  END

"${name}" table line should be highlighted
  ${name}=                  Check Text                         ${name}
  ${element}=               Set Variable                       //*[contains(text(),"${name}")]//ancestor::*[contains(@class,"!bg-teal-100")]
  Wait Until Element Is Existent                               ${element}


# Enter "${type}" in input search placeholder "${placeholder}" with "${text}"
#   Wait Until Element Spin
#   ${text}=                   Get Random Text                   ${type}                    ${text}
#   ${element}=                Get Element                       //input[contains(@placeholder, "${placeholder}")]
#   Clear Text                 ${element}
#   Fill Text                  ${element}                        ${text}
#   ${cnt}=                    Get Length                        ${text}
#   IF  ${cnt} > 0
#     Set Global Variable      \${STATE["${placeholder}"]}       ${text}
#   END

Enter "${type}" in search box placeholder "${placeholder}" with "${text}"
  Wait Until Element Spin
  ${text}=                   Get Random Text                   ${type}                       ${text}
  ${element}=                Get Element                       //div[contains(@class,"ant-table-filter-dropdown")]//input[contains(@placeholder, "${placeholder}")]
  Clear Text                 ${element}
  Fill Text                  ${element}                        ${text}
  ${cnt}=                    Get Length                        ${text}
  IF  ${cnt} > 0
    Set Global Variable      \${STATE["${placeholder}"]}       ${text}
  END

"${name}" should be visible in the table line
  Wait Until Element Spin
  ${name}=                  Check Text                         ${name}
  ${element}=               Set Variable                       //tbody//tr[contains(@class,"ant-table-row")]//*[contains(text(),"${name}")]
  Wait Until Element Is Existent                               ${element}

"${name}" should not be visible in the table line
  ${name}=                  Check Text                         ${name}
  ${element}=               Set Variable                       //tbody//tr[contains(@class,"ant-table-row")]//*[contains(text(),"${name}")]
  Wait Until Page Does Not Contain Element                     ${element}

"${name}" should be visible in the first table line
  Wait Until Element Spin
  ${name}=                  Check Text                         ${name}
  Get Text                  (//tbody/tr[2]/td[1]//span)[last()]         equal                         ${name}

"${name}" should not be visible in the first table line
  Wait Until Element Spin
  ${name}=                  Check Text                         ${name}
  Get Text                  (//tbody/tr[2]/td[1]//span)[last()]          inequal                       ${name}

Table line should show empty
  ${element}=               Set Variable                       //*[contains(@class, "ant-table-empty")]
  Wait Until Element Is Existent                               ${element}
  ${cnt}=                   Get Element Count                  ${element}//*[text() = "Trống"]
  Should Be True            ${cnt} > 0

Click on magnifier icon in "${name}" table cell
  ${cnt}=                   Get Element Count                  //th[@aria-label = "${name}"]//span[contains(@class,"ant-dropdown-open")]
  IF    ${cnt} == 0
    Click                     //th[@aria-label = "${name}"]//*[contains(@id,"Layer_1")]
    Wait Until Element Spin
  ELSE
    Click                     //th[@aria-label = "${name}"]//*[contains(@id,"Layer_1")]
    Wait Until Element Spin
    Click                     //th[@aria-label = "${name}"]//*[contains(@id,"Layer_1")]
    Wait Until Element Spin
  END

Click on calendar icon in "${name}" table cell
  Click                     //th[@aria-label = "${name}"]//*[contains(@id,"Layer_1")]
  Wait Until Element Spin

Click on sort icon in "${name}" table cell
  #Click                     //th[@aria-label = "${name}"]//div[@class="ant-table-column-sorters"]
  Click                      //span[text()="${name}"]//ancestor::div[contains(@class,"ant-table-column-sorters")]
  Wait Until Element Spin

The list of radio is empty
  ${element}=               Set Variable                      //div[@class = "p-1"]//span[contains(@class,"px-2")]
  Wait Until Element Is Existent                              ${element}
  Get Text                  ${element}                        equal                     Trống

Click radio "${name}" in search box
  Wait Until Element Spin
  Click                     //span[contains(text(),"${name}")]//ancestor::label[contains(@class,"ant-checkbox-wrapper")]//span[contains(@class,"ant-wave-target")]

All radio selection in "${name}" should be uncheck
  Click                     //th[@aria-label = "${name}"]//*[contains(@id,"Layer_1")]
  Wait Until Element Spin
  ${count}=                 Get Element Count                  //label[contains(@class,"ant-checkbox-wrapper-checked")]
  Should Be True            ${count} < 1
  Click                     //th[@aria-label = "${name}"]//*[contains(@id,"Layer_1")]

Get the image's information in "${name}" field
  ${name}=                  Check Text                        ${name}
  ${element}=               Get Element Form Item By Name     ${name}                       //a
  Element Should Be Exist                                     ${element}
  ${infor}=                 Get Attribute                     ${element}                    href
  RETURN                  ${infor}

### --- Check UI --- ###
Heading should contain "${text}" inner text
  ${text}=                  Check Text                        ${text}
  ${element}=               Set Variable                      //*[self::h1 or self::h2 or self::h3 or self::h4 or self::h5 or self::h6][contains(text(),"${text}")]
  Wait Until Element Is Existent                              ${element}

Heading of separated group should contain "${text}" inner text
  ${text}=                  Check Text                        ${text}
  ${element}=               Set Variable                      //*[contains(@class,"mx-auto")]//*[contains(@class, "text-xl") and contains(text(),"${text}")]
  ${cnt}=                   Get Element Count                 ${element}
  IF    ${cnt} > 0
    Wait Until Element Is Existent                            ${element}
  ELSE
    ${element}=             Set Variable                      //*[contains(@class,"mx-auto")]//*[contains(@class, "text-lg") and contains(text(),"${text}")]
    Wait Until Element Is Existent                            ${element}
  END

Webpage should contain "${name}" input field
  ${element}=               Get Element                       (//label[@title="${name}"]//ancestor::div[contains(@class,"ant-row")][1]//div[@class="ant-form-item-control-input"])[1]
  ${count}=                 Get Element Count                 ${element}
  Should Be True            ${count} >= 1

Webpage should contain "${name}" button
  ${element}=               Set Variable                      //button[(text()="${name}")]
  ${cnt}=                   Get Element Count                 ${element}
  Should Be True            ${cnt} > 0

Webpage should contain "${name}" select field
  ${element}=               Set Variable                      //label[contains(@title,"${name}")]//ancestor::div[contains(@class,"ant-row")][1]//div[contains(@class,"ant-select-selector")]
  Wait Until Element Is Existent                              ${element}

Webpage should contain the profile information group with name and role
  ${element}=               Get Element                       //form[contains(@class,"ant-form-vertical")]/div[contains(@class,"group-input-profile")]//div[contains(@class,"relative")]/a
  ${count}=                 Get Element Count                 ${element}
  Should Be True            ${count} >= 1

Webpage should contain "${name}" tab
  ${text}                   Evaluate                           "${name}".lower()
  ${text2}                  Evaluate                           "${text}".capitalize()
  ${element}=               Set Variable                       //*[contains(@class,"ant-tabs")]//*[@role="tab" and text()="${text2}"]
  Wait Until Element Is Existent                               ${element}

Webpage should contain "${name}" column with sort and search function
  Element Should Be Exist                   //th[@aria-label = "${name}"]
  ${count2}=                Get Element Count                   //th[@aria-label = "${name}"]//span[contains(@class,"ant-table-column-sorter")]
  Should Be True            ${count2} > 0
  ${count3}=                Get Element Count                   //th[@aria-label = "${name}"]//span[contains(@class,"ant-table-filter-trigger")]
  Should Be True            ${count3} > 0

Webpage should contain "${name}" column with sort function
  ${count1}=                Get Element Count                   //th[@aria-label = "${name}"]
  Should Be True            ${count1} > 0
  ${count2}=                Get Element Count                   //th[@aria-label = "${name}"]//span[contains(@class,"ant-table-column-sorter")]
  Should Be True            ${count2} > 0

Webpage should contain "${name}" image upload field
  Element Should Be Exist                                       //label[@title="${name}"]
  ${cnt}=                   Get Element Count                   //label[@title="${name}"]
  IF    ${cnt} > 0
    ${cntS}=                Get Element Count                   //label[@title="${name}"]//ancestor::div[contains(@class,"ant-form-item")]//input[@type="file"]
    Should Be True          ${cntS} > 0
  END

Webpage should contain "${name}" column
  ${count1}=                Get Element Count                   //th[@aria-label = "${name}"]
  ${passed}=                Run Keyword And Return Status
  ...                       Should Be True    ${count1} > 0
  IF    "${passed}" == "False"
    ${count2}=              Get Element Count                   //th[text() = "${name}"]
    Should Be True          ${count2} > 0
  END

Webpage should contain "${name}" group
  ${element}=               Set Variable                        //h3[text() = "${name}"]//ancestor::div[contains(@class,"shadow")]/div[contains(@class,"ant-spin-nested-loading")]
  Element Should Be Exist                                       ${element}

Webpage should contain the list data from database
  ${count}=                 Get Element Count                   //div[contains(@class,"container")]
  Should Be True            ${count} >= 1

Webpage should contain the search function
  ${element}=               Set Variable                        //*[contains(@id,"input_search")]
  Element Should Be Exist                                       ${element}

The status button in the "${name}" table line should change to "${text}"
  Wait Until Element Spin
  ${name}=                  Check Text                         ${name}
  ${element}=               Get Element                        //tbody//*[contains(text(),"${name}")]//ancestor::tr//button[1]
  ${content}=               Get Property                       ${element}                           title                   equal                ${text}

Confirm locating exactly in "${name}" page of "${menu}" menu
  Wait Until Element Spin
  ${element}=               Set Variable                       //header//span[contains(@class,"text-gray-400") and text()="${menu}"]
  Element Should Be Exist                                      ${element}
  ${cnt}=                   Get Element Count                  ${element}/../span[contains(text(),"${name}")]
  Should Be True            ${cnt} > 0

### Relate to number of list page ###
Count the number account in list
  Wait Until Element Spin
  ${element}=                Set Variable                      xpath=//tbody//tr[contains(@class, "ant-table-row")]
  ${count}=                  Get Element Count                 ${element}
  IF    ${count} <= 0
    Wait Until Element Spin
    ${count}=                Get Element Count                 ${element}
    ${count}=                Convert To Integer                ${count}
  ELSE
    ${count}=                Convert To Integer                ${count}
  END
  RETURN                   ${count}

Get number account list in last page
  ${element}=                Get Element                       //span[contains(@class, "ml-3")]
  ${text}=                   Get Text                          ${element}
  ${pageNum}=                Count the number account in list
    ${condition}=            Get Text                          //header//h1
  IF    "${condition}" == "Danh sách Người dùng"
    ${total}=                 Get Regexp Matches                ${text}                     số (.+) người                1
  ELSE
    ${total}=                 Get Regexp Matches                ${text}                     số (.+) danh                 1
  END
  ${total}=                  Convert To Integer                ${total[0]}
  ${NumberAcc}=              Evaluate                          ${total} % ${pageNum}
  IF    ${NumberAcc} == 0
    ${NumberAccount}=        Set Variable                      ${pageNum}
  ELSE
    ${NumberAccount}=        Set Variable                      ${NumberAcc}
  END
  RETURN                   ${NumberAccount}

Get the number of total account
  ${element}=                Get Element                       //span[contains(@class, "ml-3")]
  ${text}=                   Get Text                          ${element}
  ${total}=                  Get Regexp Matches                ${text}                     /Tổng số${SPACE}(\\d+)${SPACE}                   1
  ${total}=                  Convert To Integer                ${total[0]}
  ${cnt}=                    Get Length                        ${text}
  IF  ${cnt} > 0
    ${TotalAccount}=         Set Variable                      ${total}
  END
  RETURN                   ${TotalAccount}

Get the last page number
  ${element}=                Get Element                       //span[contains(@class, "ml-3")]
  ${text}=                   Get Text                          ${element}
  ${pageNum}=                Count the number account in list
  ${condition}=              Get Text                          //header//h1
  IF    "${condition}" == "Danh sách Người dùng"
    ${totalP}=                 Get Regexp Matches                ${text}                     số (.+) người                1
  ELSE
    ${totalP}=                 Get Regexp Matches                ${text}                     số (.+) danh                 1
  END
  ${totalP}=                 Convert To Integer                ${totalP[0]}
  ${con}=                    Evaluate                          ${totalP} % ${pageNum}
  IF    ${con} == 0
    ${lastPN}=               Evaluate                          ${totalP}//${pageNum}
  ELSE
    ${lastPN}=               Evaluate                          (${totalP}//${pageNum})+1
  END
  ${cnt}=                    Get Length                        ${text}
  IF  ${cnt} > 0
    ${lastPageNumber}=       Set Variable                      ${lastPN}
    ${lastPageNumber}=       Convert To String                 ${lastPageNumber}
  END
  RETURN                   ${lastPageNumber}

Number account of page
  ${element}=                Get Element                       //span[contains(@class, "ml-3")]
  ${text}=                   Get Text                          ${element}
  ${pageNum}=                Get Regexp Matches                ${text}                     -(.+) của                   1
  ${pageNum}=                Set Variable                      ${pageNum[0]}
  ${cnt}=                    Get Length                        ${text}
  IF  ${cnt} > 0
    ${pageNumber}=           Set Variable                      ${pageNum}
  END
  RETURN                   ${pageNumber}

Check the amount of page list
  Wait Until Element Spin
  ${element_E}=              Set Variable                      //*[contains(@class, "ant-table-empty")]
  ${cnt_E}=                  Get Element Count                 ${element_E}
  IF    ${cnt_E} > 0
    Pass Execution           "This list do not contains data"
  END
  ${countA}=                 Count the number account in list
  ${totalA}=                 Get the number of total account
  IF    ${countA} == ${totalA}
    ${amountPage}=           Set Variable                      1
    Pass Execution           "This list contains only one page"
  ELSE IF    ${countA} < ${totalA}
    ${amountPage}=           Evaluate                          (${totalA}//${countA})+1
    ${amountPage}=           Set Variable                      ${amountPage}
  END
  RETURN                   ${amountPage}

### --- List of account navigation --- ###
Move to the "${target}" page
  ${count}=                   Get Length                       ${target}
  IF    "${target}" == "previous"
      Click                   xpath=//button[@aria-label = "prev"]/*[contains(@id, "Layer_1")]
  ELSE IF    "${target}" == "next"
      Click                   xpath=//button[@aria-label = "next"]/*[contains(@id, "Layer_1")]
  ELSE
      ${number}=              Convert To Integer               ${target}
      Click                   xpath=//button[@aria-label = "page_${number}"]
  END
  Wait Until Element Spin

Move to the last page and check
  ${countS}=                  Get number account list in last page
  ${number}=                  Get the last page number
  Move to the "${number}" page
  Wait Until Element Spin
  ${elementS}=                Set Variable                     xpath=//tbody//tr[contains(@class, "ant-table-row")]
  ${count}=                   Get Element Count                ${elementS}
  ${count}=                   Convert To Integer               ${count}
  Should Be Equal             ${count}                         ${countS}

Click on "${ordinal}" selection to change the number of data show in list and check
  Wait Until Element Spin
  ${cnt}=                       Get Length                      ${ordinal}
  IF        ${cnt} > 3 and "${ordinal}" == "first"
    ${select}=                  Set Variable                    1
  ELSE IF   ${cnt} > 3 and "${ordinal}" == "second"
    ${select}=                  Set Variable                    2
  ELSE IF   ${cnt} > 3 and "${ordinal}" == "third"
    ${select}=                  Set Variable                    3
  ELSE IF   ${cnt} > 3 and "${ordinal}" == "fourth"
    ${select}=                  Set Variable                    4
  ELSE IF   ${cnt} > 3 and "${ordinal}" == "fifth"
    ${select}=                  Set Variable                    5
  ELSE
    ${select}=                  Convert To Integer              ${ordinal}
  END
  ${amountPage}=                Check the amount of page list
  ${text_current}=              Get Text                        //div[contains(@class,"overflow-auto")]//*[contains(@class, "ant-select-selection-item")]
  ${current_number}             Convert To Integer              ${text_current}
  Click                         //div[contains(@class,"overflow-auto")]//*[contains(@class, "ant-select-selection-item")]
  Wait Until Element Spin
  ${text_default}=              Get Text                        //div[@aria-selected = "true"]/div[contains(@class,"ant-select-item-option-content")]
  ${default_number}=            Convert To Integer              ${text_default}
  ${text_select}=               Get Text                        //div[@class = "rc-virtual-list-holder-inner"]/div[${select}]/div
  ${select_number}=             Convert To Integer              ${text_select}
  IF                            ${amountPage} >= 2
    IF                          ${current_number} < ${select_number}
      Move to the "next" page
      ${name}=                  Get data in the first row
      Move to the "previous" page
      ${ordinal_before}=        Evaluate                        ${current_number} + 2
      Click                     //div[contains(@class,"overflow-auto")]//*[contains(@class, "ant-select-selection-item")]
      Wait Until Element Spin
      Click                     //div[@class = "rc-virtual-list-holder-inner"]/div[${select}]/div
      Wait Until Element Spin
      Get Text                  //tbody//tr[${ordinal_before}]//span                            equal                       ${name}
    ELSE IF                     ${current_number} > ${select_number}
      ${ordinal_before}=        Evaluate                        ${select_number} + 2
      ${name}=                  Get Text                        //tbody//tr[${ordinal_before}]//span
      Click                     //div[contains(@class,"overflow-auto")]//*[contains(@class, "ant-select-selection-item")]
      Wait Until Element Spin
      Click                     //div[@class = "rc-virtual-list-holder-inner"]/div[${select}]/div
      Wait Until Element Spin
      Move to the "next" page
      ${nameS}=                 Get data in the first row
      Move to the "previous" page
      Should Be Equal           ${nameS}                         ${name}
      # Move to the "previous" page
    ELSE IF                     ${current_number} = ${select_number}
      Click                     //div[contains(@class,"overflow-auto")]//*[contains(@class, "ant-select-selection-item")]
      Wait Until Element Spin
      Click                     //div[@class = "rc-virtual-list-holder-inner"]/div[${select}]/div
      Wait Until Element Spin
    END
  ELSE IF                       ${amountPage} < 2
    IF                          ${current_number} <= ${select_number}
      Click                     //div[contains(@class,"overflow-auto")]//*[contains(@class, "ant-select-selection-item")]
      Wait Until Element Spin
      Click                     //div[@class = "rc-virtual-list-holder-inner"]/div[${select}]/div
      Wait Until Element Spin
    ELSE IF                     ${current_number} > ${select_number}
      ${account_number}=        Count the number account in list
      IF       ${account_number} > ${select_number}
        ${ordinal_before}=      Evaluate                         ${select_number} + 2
        ${name}=                Get Text                         //tbody//tr[${ordinal_before}]//span
        Click                   //div[contains(@class,"overflow-auto")]//*[contains(@class, "ant-select-selection-item")]
        Wait Until Element Spin
        Click                   //div[@class = "rc-virtual-list-holder-inner"]/div[${select}]/div
        Wait Until Element Spin
        Move to the "next" page
        ${nameS}=               Get data in the first row
        Move to the "previous" page
        Should Be Equal         ${nameS}                         ${name}
        # Move to the "previous" page
      ELSE IF    ${account_number} <= ${select_number}
        Click                   //div[contains(@class,"overflow-auto")]//*[contains(@class, "ant-select-selection-item")]
        Wait Until Element Spin
        Click                   //div[@class = "rc-virtual-list-holder-inner"]/div[${select}]/div
        Wait Until Element Spin
      END
    END
  END

### --- Get the account name --- ###
Get data in the last row
  ${pageN}=                   Count the number account in list
  ${number}=                  Evaluate                         ${pageN}+1
  ${element}=                 Get Element                      //tbody//tr[${number}]//span
  ${LAname}=                  Get Text                         ${element}
  ${cnt}=                     Get Length                       ${LAname}
  IF   ${cnt} > 0
    Set Global Variable       \${LAname}                        ${LAname}
  END
  RETURN                    ${LAname}

Get data in the first row
  ${element}=                 Get Element                      //tbody//tr[2]//span
  ${Fname}=                   Get Text                         ${element}
  ${cnt}=                     Get Length                       ${Fname}
  IF   ${cnt} > 0
    ${Fname}=                 Set Variable                     ${Fname}
  END
  RETURN                    ${Fname}
