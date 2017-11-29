from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import selenium.webdriver.support.ui as ui
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class TestSearch(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "https://www.katalon.com/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_search(self):
        driver = self.driver
        driver.get("http://marvelus.me")
        # Find the global search bar and search Tom Holland
        driver.find_element_by_id("formBasicText").clear()
        driver.find_element_by_id("formBasicText").send_keys("Tom Holland")
        driver.find_element_by_id("formBasicText").send_keys(Keys.ENTER)
        # Wait for it to search
        time.sleep(7)
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Actor Results[\s\S]*$")
        self.assertRegexpMatches(driver.find_element_by_css_selector("BODY").text, r"^[\s\S]*Tom Holland[\s\S]*$")
        # Click on the panel that goes to Tom Holland's page
        driver.find_element_by_xpath("/html/body/div[@id='root']/div/main/div[@class='container']/div[@class='row'][1]/div[@class='col-md-2 col-sm-4 col-xs-12']/a/div[@class='panel']/div[@class='panel-heading']").click()
        # Wait for it to load
        time.sleep(2)
        self.assertEqual("http://marvelus.me/actor/1136406", driver.current_url)

    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
