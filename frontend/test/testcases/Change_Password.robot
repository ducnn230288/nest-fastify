*** Settings ***
Resource               ../keywords/common.robot
Test Setup             Setup
Test Teardown          Tear Down

*** Test Cases ***
### Link to testcases https://docs.google.com/spreadsheets/d/1R_jW5GBVBaMy7YgNKJQ2Ha5xW12Vn0nRzOHE0-OsyF8/edit#gid=1273076502 ###

### Verify the User Interface of the 'ĐỔI MẬT KHẨU' page ###
CP_01_01 Verify the User Interface of "ĐỔI MẬT KHẨU" tab
  [Tags]                                                                                                MainPage                   UI                     Smoketest
  Login to admin
  When Click "Thông tin cá nhân" line in the avatar's account
  When Click on "ĐỔI MẬT KHẨU" tab
  Then Heading should contain "Thông tin cá nhân" inner text
  Then Webpage should contain the profile information group with name and role
  Then Webpage should contain "Mật khẩu" input field
  Then Webpage should contain "Mật khẩu mới" input field
  Then Webpage should contain "Xác nhận mật khẩu" input field
  Then Webpage should contain "Đổi mật khẩu" button
  Then Webpage should contain "Huỷ bỏ" button

CP_01_02 Verify the User Interface of "ĐỔI MẬT KHẨU" tab
  [Tags]                                                                                                MainPage                   UI                     Smoketest
  Login to admin
  When Click "Đổi mật khẩu" line in the avatar's account
  Then Heading should contain "Thông tin cá nhân" inner text
  Then Webpage should contain the profile information group with name and role
  Then Webpage should contain "Mật khẩu" input field
  Then Webpage should contain "Mật khẩu mới" input field
  Then Webpage should contain "Xác nhận mật khẩu" input field
  Then Webpage should contain "Đổi mật khẩu" button
  Then Webpage should contain "Huỷ bỏ" button

CP_02 Verify the showing password function in "Mật khẩu" field
  [Tags]                                                                                                MainPage                   UI
  Login to admin
  Click "Đổi mật khẩu" line in the avatar's account
  When Enter "password" in "Mật khẩu" with "_RANDOM_"
  When Click on eye icon in "Mật khẩu" field
  Then The hidden password in "Mật khẩu" field should be visibled as "_@Mật khẩu@_"

CP_03 Verify the showing password function in "Mật khẩu mới" field
  [Tags]                                                                                                MainPage                   UI
  Login to admin
  Click "Đổi mật khẩu" line in the avatar's account
  When Enter "password" in "Mật khẩu mới" with "_RANDOM_"
  When Click on eye icon in "Mật khẩu mới" field
  Then The hidden password in "Mật khẩu mới" field should be visibled as "_@Mật khẩu mới@_"

CP_04 Verify the showing password function in "Xác nhận mật khẩu" field
  [Tags]                                                                                                MainPage                   UI
  Login to admin
  Click "Đổi mật khẩu" line in the avatar's account
  When Enter "password" in "Xác nhận mật khẩu" with "_RANDOM_"
  When Click on eye icon in "Xác nhận mật khẩu" field
  Then The hidden password in "Xác nhận mật khẩu" field should be visibled as "_@Xác nhận mật khẩu@_"

### Verify that change the account's password ###
CP_05 Verify that changing a new password 
  [Tags]                                                                                                ChangePassword
  Go to "ĐỔI MẬT KHẨU" page
  When Enter "password" in "Mật khẩu" with "Password1!"
  When Enter "password" in "Mật khẩu mới" with "_RANDOM_"
  When Enter "password" in "Xác nhận mật khẩu" with "_@Mật khẩu mới@_"
  When Click "Đổi mật khẩu" button
  Then User look message "Thành công" popup
  When Reset origin password

# CP_06 Verify that changing new password by entering wrong password
#   [Tags]                                                                                                ChangePassword
#   Go to "ĐỔI MẬT KHẨU" page
#   When Enter "password" in "Mật khẩu" with "_RANDOM_"
#   When Enter "password" in "Mật khẩu mới" with "_RANDOM_"
#   When Enter "password" in "Xác nhận mật khẩu" with "_@Mật khẩu mới@_"
#   When Click "Đổi mật khẩu" button
#   Then User look message "Mật khẩu cũ không chính xác" popup

CP_07 Verify that changing new password by entering the confirm password different to new password
  [Tags]                                                                                                ChangePassword
  Go to "ĐỔI MẬT KHẨU" page
  When Enter "password" in "Mật khẩu" with "Password1!"
  When Enter "password" in "Mật khẩu mới" with "_RANDOM_"
  When Enter "password" in "Xác nhận mật khẩu" with "_RANDOM_"
  When Click "Đổi mật khẩu" button
  Then Required message "Hai mật khẩu bạn nhập không nhất quán!" displayed under "Xác nhận mật khẩu" field

CP_08_01 Verify that changing new password by entering the confirm password different to new password
  [Tags]                                                                                                ChangePassword
  Go to "ĐỔI MẬT KHẨU" page
  When Enter "password" in "Mật khẩu" with "Password1!"
  When Enter "text" in "Mật khẩu mới" with "123123"
  When Enter "text" in "Xác nhận mật khẩu" with "_@Mật khẩu mới@_"
  When Click "Đổi mật khẩu" button
  Then Required message "Xin vui lòng nhập tối thiểu 8 ký tự số!" displayed under "Mật khẩu mới" field

CP_08_02 Verify that changing new password by entering the confirm password different to new password
  [Tags]                                                                                                ChangePassword
  Go to "ĐỔI MẬT KHẨU" page
  When Enter "password" in "Mật khẩu" with "Password1!"
  When Enter "text" in "Mật khẩu mới" with "Admin123"
  When Enter "text" in "Xác nhận mật khẩu" with "_@Mật khẩu mới@_"
  When Click "Đổi mật khẩu" button
  Then Required message "Mật khẩu yêu cầu có 8 ký tự trở lên, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 kí tự đặc biệt" displayed under "Mật khẩu mới" field

CP_09 Verify the chaging password function by leaving the blank field in "Mật khẩu" 
  [Tags]                                                                                                ChangePassword                        BlankField
  Go to "ĐỔI MẬT KHẨU" page
  When Enter "password" in "Mật khẩu mới" with "_RANDOM_"
  When Enter "password" in "Xác nhận mật khẩu" with "_@Mật khẩu mới@_"
  When Click "Đổi mật khẩu" button
  Then Required message "Xin vui lòng nhập mật khẩu" displayed under "Mật khẩu" field

CP_10 Verify the chaging password function by leaving the blank field in "Mật khẩu mới"
  [Tags]                                                                                                ChangePassword                        BlankField
  Go to "ĐỔI MẬT KHẨU" page
  When Enter "password" in "Mật khẩu" with "Password1!"
  When Enter "password" in "Xác nhận mật khẩu" with "_RANDOM_"
  When Click "Đổi mật khẩu" button
  Then Required message "Xin vui lòng nhập mật khẩu mới" displayed under "Mật khẩu mới" field

CP_11 Verify the chaging password function by leaving the blank field in "Xác nhận mật khẩu" 
  [Tags]                                                                                                ChangePassword                        BlankField
  Go to "ĐỔI MẬT KHẨU" page
  When Enter "password" in "Mật khẩu" with "Password1!"
  When Enter "password" in "Mật khẩu mới" with "_RANDOM_"
  When Click "Đổi mật khẩu" button
  Then Required message "Xin vui lòng nhập xác nhận mật khẩu" displayed under "Xác nhận mật khẩu" field

*** Keywords ***
Go to "ĐỔI MẬT KHẨU" page
  Login to admin
  Click "Đổi mật khẩu" line in the avatar's account
  Wait Until Element Spin

Reset origin password
  Enter "password" in "Mật khẩu" with "_@Mật khẩu mới@_"
  Enter "password" in "Mật khẩu mới" with "${password_admin}"
  Enter "password" in "Xác nhận mật khẩu" with "${password_admin}"
  Click "Đổi mật khẩu" button
  User look message "Thành công" popup