*** Settings ***
Resource                       ../keywords/common.robot
Test Setup                     Setup
Test Teardown                  Tear Down
Library                        DateTime

*** Variables ***
${Default_Linkedin}            https://www.linkedin.com/company/aritechnology
${Default_Facebook}            https://www.facebook.com/ARI-Technology-103059672364812
${Default_Phone}               (+84)36 367 2405
${Default_Email}               contact@ari.com.vn
${Default_Address_Vn}          P3A.01.03, Picity High Park, 9A đường Thạnh Xuân 13, P. Thạnh Xuân, Q.12, TP. Hồ Chí Minh, Việt Nam.
${Default_Address_En}          P3A.01.03, Picity High Park, 9A Thạnh Xuan 13 St., Thạnh Xuan Ward, 12 Dist., Ho Chi Minh City, Vietnam.

*** Test Cases ***
### Link to testcases https://docs.google.com/spreadsheets/d/1R_jW5GBVBaMy7YgNKJQ2Ha5xW12Vn0nRzOHE0-OsyF8/edit#gid=1099362545 ###

### Verify the User Interface of the 'Danh sách tham số' page ###
PL_01 Verify that navigate to the exact tree of "Linkedin"
  [Tags]                                                                                                MainPage                   Linkedin                 UI                     Smoketest  BUG1
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Linkedin" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Confirm locating exactly in "Tham số" page of "Thiết lập" menu
  Then Heading of separated group should contain "Chỉnh sửa tham số linkedin" inner text

PL_02 Verify the User Interface of "Linkedin" tree in "Danh sách tham số" page
  [Tags]                                                                                                MainPage                   Linkedin                 UI                     Smoketest
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Linkedin" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Heading of separated group should contain "Chỉnh sửa tham số linkedin" inner text
  Then Webpage should contain "Tiếng Việt" input field
  Then Webpage should contain "Tiếng Anh" input field
  Then Webpage should contain "Lưu lại" button

PL_03 Verify that navigate to the exact tree of "Facebook"
  [Tags]                                                                                                MainPage                   Facebook                 UI                     Smoketest
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Facebook" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Confirm locating exactly in "Tham số" page of "Thiết lập" menu
  Then Heading of separated group should contain "Chỉnh sửa tham số facebook" inner text

PL_04 Verify the User Interface of "Facebook" tree in "Danh sách tham số" page
  [Tags]                                                                                                MainPage                   Facebook                 UI
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Facebook" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Heading of separated group should contain "Chỉnh sửa tham số facebook" inner text
  Then Webpage should contain "Tiếng Việt" input field
  Then Webpage should contain "Tiếng Anh" input field
  Then Webpage should contain "Lưu lại" button

PL_05 Verify that navigate to the exact tree of "Phone"
  [Tags]                                                                                                MainPage                   Phone                 UI                     Smoketest
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Phone" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Confirm locating exactly in "Tham số" page of "Thiết lập" menu
  Then Heading of separated group should contain "Chỉnh sửa tham số phone" inner text

PL_06 Verify the User Interface of "Phone" tree in "Danh sách tham số" page
  [Tags]                                                                                                MainPage                   Phone                 UI
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Phone" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Heading of separated group should contain "Chỉnh sửa tham số phone" inner text
  Then Webpage should contain "Tiếng Việt" input field
  Then Webpage should contain "Tiếng Anh" input field
  Then Webpage should contain "Lưu lại" button

PL_07 Verify that navigate to the exact tree of "Email"
  [Tags]                                                                                                MainPage                   Email                 UI                     Smoketest
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Email" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Confirm locating exactly in "Tham số" page of "Thiết lập" menu
  Then Heading of separated group should contain "Chỉnh sửa tham số email" inner text

PL_08 Verify the User Interface of "Email" tree in "Danh sách tham số" page
  [Tags]                                                                                                MainPage                   Email                 UI
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Email" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Heading of separated group should contain "Chỉnh sửa tham số email" inner text
  Then Webpage should contain "Tiếng Việt" input field
  Then Webpage should contain "Tiếng Anh" input field
  Then Webpage should contain "Lưu lại" button

PL_09 Verify that navigate to the exact tree of "Address"
  [Tags]                                                                                                MainPage                   Address                 UI
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Address" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Confirm locating exactly in "Tham số" page of "Thiết lập" menu
  Then Heading of separated group should contain "Chỉnh sửa tham số address" inner text

PL_10 Verify the User Interface of "Address" tree in "Danh sách tham số" page
  [Tags]                                                                                                MainPage                   Address                 UI
  Login to admin
  Click "Thiết lập" menu
  When Click "Tham số" sub menu to "/#/vn/setting/parameter"
  When Click on "Address" tree
  Then Heading should contain "Danh sách tham số" inner text
  Then Heading of separated group should contain "Chỉnh sửa tham số address" inner text
  Then Webpage should contain "Tiếng Việt" input field
  Then Webpage should contain "Tiếng Anh" input field
  Then Webpage should contain "Lưu lại" button

### Verify that edit the parameter's information ###
PL_11 Verity that edit information in "Linkedin" tree by changing the data in "Tiếng Việt" input field with valid data
  [Tags]                                                                                                EditInfo                   Linkedin
  Go to "Danh sách tham số" page with "Linkedin" list
  When Enter "text" in "Tiếng Việt" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Việt" should be equal "_@Tiếng Việt@_"
  When Enter "text" in "Tiếng Việt" with "${Default_Linkedin}"
  When Click "Lưu lại" button

PL_12 Verity that edit information in "Linkedin" tree by changing the data in "Tiếng Anh" input field with valid data
  [Tags]                                                                                                EditInfo                   Linkedin
  Go to "Danh sách tham số" page with "Linkedin" list
  When Enter "text" in "Tiếng Anh" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Anh" should be equal "_@Tiếng Anh@_"
  When Enter "text" in "Tiếng Anh" with "${Default_Linkedin}"
  When Click "Lưu lại" button

# PL_13 Verity that CAN NOT edit information in "Linkedin" tree by leaving blank field in "Tiếng Việt"
#   [Tags]                                                                                                EditInfo                   Linkedin
#   Go to "Danh sách tham số" page with "Linkedin" list
#   When Enter "text" in "Tiếng Việt" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số linkedin" displayed under "Tiếng Việt" field

# PL_14 Verity that CAN NOT edit information in "Linkedin" tree by leaving blank field in "Tiếng Anh"
#   [Tags]                                                                                                EditInfo                   Linkedin
#   Go to "Danh sách tham số" page with "Linkedin" list
#   When Enter "text" in "Tiếng Anh" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số linkedin" displayed under "Tiếng Anh" field

PL_15 Verity that edit information in "Facebook" tree by changing the data in "Tiếng Việt" input field with valid data
  [Tags]                                                                                                EditInfo                   Facebook
  Go to "Danh sách tham số" page with "Facebook" list
  When Enter "text" in "Tiếng Việt" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Việt" should be equal "_@Tiếng Việt@_"
  When Enter "text" in "Tiếng Việt" with "${Default_Facebook}"
  When Click "Lưu lại" button

PL_16 Verity that edit information in "Facebook" tree by changing the data in "Tiếng Anh" input field with valid data
  [Tags]                                                                                                EditInfo                   Facebook
  Go to "Danh sách tham số" page with "Facebook" list
  When Enter "text" in "Tiếng Anh" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Anh" should be equal "_@Tiếng Anh@_"
  When Enter "text" in "Tiếng Anh" with "${Default_Facebook}"
  When Click "Lưu lại" button

# PL_17 Verity that CAN NOT edit information in "Facebook" tree by leaving blank field in "Tiếng Việt"
#   [Tags]                                                                                                EditInfo                   Facebook
#   Go to "Danh sách tham số" page with "Facebook" list
#   When Enter "text" in "Tiếng Việt" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số Facebook" displayed under "Tiếng Việt" field

# PL_18 Verity that CAN NOT edit information in "Facebook" tree by leaving blank field in "Tiếng Anh"
#   [Tags]                                                                                                EditInfo                   Facebook
#   Go to "Danh sách tham số" page with "Facebook" list
#   When Enter "text" in "Tiếng Anh" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số Facebook" displayed under "Tiếng Anh" field

PL_19 Verity that edit information in "Phone" tree by changing the data in "Tiếng Việt" input field with valid data
  [Tags]                                                                                                EditInfo                   Phone
  Go to "Danh sách tham số" page with "Phone" list
  When Enter "number" in "Tiếng Việt" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Việt" should be equal "_@Tiếng Việt@_"
  When Enter "number" in "Tiếng Việt" with "${Default_Phone}"
  When Click "Lưu lại" button

PL_20 Verity that edit information in "Phone" tree by changing the data in "Tiếng Anh" input field with valid data
  [Tags]                                                                                                EditInfo                   Phone
  Go to "Danh sách tham số" page with "Phone" list
  When Enter "number" in "Tiếng Anh" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Anh" should be equal "_@Tiếng Anh@_"
  When Enter "number" in "Tiếng Anh" with "${Default_Phone}"
  When Click "Lưu lại" button

# PL_21 Verity that CAN NOT edit information in "Phone" tree by leaving blank field in "Tiếng Việt"
#   [Tags]                                                                                                EditInfo                   Phone
#   Go to "Danh sách tham số" page with "Phone" list
#   When Enter "number" in "Tiếng Việt" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số Phone" displayed under "Tiếng Việt" field

# PL_22 Verity that CAN NOT edit information in "Phone" tree by leaving blank field in "Tiếng Anh"
#   [Tags]                                                                                                EditInfo                   Phone
#   Go to "Danh sách tham số" page with "Phone" list
#   When Enter "number" in "Tiếng Anh" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số Phone" displayed under "Tiếng Anh" field

PL_23 Verity that edit information in "Email" tree by changing the data in "Tiếng Việt" input field with valid data
  [Tags]                                                                                                EditInfo                   Email
  Go to "Danh sách tham số" page with "Email" list
  When Enter "email" in "Tiếng Việt" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Việt" should be equal "_@Tiếng Việt@_"
  When Enter "email" in "Tiếng Việt" with "${Default_Email}"
  When Click "Lưu lại" button

PL_24 Verity that edit information in "Email" tree by changing the data in "Tiếng Anh" input field with valid data
  [Tags]                                                                                                EditInfo                   Email
  Go to "Danh sách tham số" page with "Email" list
  When Enter "email" in "Tiếng Anh" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Anh" should be equal "_@Tiếng Anh@_"
  When Enter "email" in "Tiếng Anh" with "${Default_Email}"
  When Click "Lưu lại" button

# PL_25 Verity that CAN NOT edit information in "Email" tree by leaving blank field in "Tiếng Việt"
#   [Tags]                                                                                                EditInfo                   Email
#   Go to "Danh sách tham số" page with "Email" list
#   When Enter "email" in "Tiếng Việt" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số Email" displayed under "Tiếng Việt" field

# PL_26 Verity that CAN NOT edit information in "Email" tree by leaving blank field in "Tiếng Anh"
#   [Tags]                                                                                                EditInfo                   Email
#   Go to "Danh sách tham số" page with "Email" list
#   When Enter "email" in "Tiếng Anh" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số Email" displayed under "Tiếng Anh" field

PL_27 Verity that edit information in "Address" tree by changing the data in "Tiếng Việt" input field with valid data
  [Tags]                                                                                                EditInfo                   Address
  Go to "Danh sách tham số" page with "Address" list
  When Enter "text" in "Tiếng Việt" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Việt" should be equal "_@Tiếng Việt@_"
  When Enter "text" in "Tiếng Việt" with "${Default_Address_Vn}"
  When Click "Lưu lại" button

PL_28 Verity that edit information in "Address" tree by changing the data in "Tiếng Anh" input field with valid data
  [Tags]                                                                                                EditInfo                   Address
  Go to "Danh sách tham số" page with "Address" list
  When Enter "text" in "Tiếng Anh" with "_RANDOM_"
  When Click "Lưu lại" button
  Then User look message "Cập nhật thành công" popup
  Then Data's information in "Tiếng Anh" should be equal "_@Tiếng Anh@_"
  When Enter "text" in "Tiếng Anh" with "${Default_Address_En}"
  When Click "Lưu lại" button

# PL_29 Verity that CAN NOT edit information in "Address" tree by leaving blank field in "Tiếng Việt"
#   [Tags]                                                                                                EditInfo                   Address
#   Go to "Danh sách tham số" page with "Address" list
#   When Enter "text" in "Tiếng Việt" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số Address" displayed under "Tiếng Việt" field

# PL_30 Verity that CAN NOT edit information in "Address" tree by leaving blank field in "Tiếng Anh"
#   [Tags]                                                                                                EditInfo                   Address
#   Go to "Danh sách tham số" page with "Address" list
#   When Enter "text" in "Tiếng Anh" with ""
#   When Click "Lưu lại" button
#   Then Required message "Vui lòng nhập tham số Address" displayed under "Tiếng Anh" field


*** Keywords ***
Go to "Danh sách tham số" page with "${category}" list
  Login to admin
  Click "Thiết lập" menu
  Click "Tham số" sub menu to "/#/vn/setting/parameter"
  Select on the "${category}" item line
