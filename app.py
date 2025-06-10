from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
import time

from sqlalchemy.orm import Session
from datetime import date
from database import SessionLocal
from model import macbook_prices

db: Session = SessionLocal()

# options = webdriver.ChromeOptions()
# options.add_argument('--headless')

# driver = webdriver.Chrome(options)

driver = webdriver.Chrome()
driver.maximize_window()



product_name_url_xpath_source = []



# 14-inch MacBook Pro M4
pname = '14-inch MacBook Pro M4'
purl = 'https://www.imagineonline.store/products/14-inch-macbook-pro-m4-mw2u3hn-a'
pxpath = '/html/body/main/section[1]/section/div/div[5]/product-info/div[2]/div/div/p/span[2]/span'
psource = 'imagine'
arr = [pname,purl,pxpath,psource]
product_name_url_xpath_source.append(arr)

# 14-inch MacBook Pro M4 Pro
pname = '14-inch MacBook Pro M4 Pro'
purl = 'https://www.imagineonline.store/products/14-inch-macbook-pro-m4-pro-mx2e3hn-a'
pxpath = '/html/body/main/section[1]/section/div/div[5]/product-info/div[2]/div/div/p/span[2]/span'
psource = 'imagine'
arr = [pname,purl,pxpath,psource]
product_name_url_xpath_source.append(arr)

# 14-inch MacBook Pro M4 Max
pname = '14-inch MacBook Pro M4 Max'
purl = 'https://www.imagineonline.store/products/14-inch-macbook-pro-m4-max-mx2k3hn-a'
pxpath = '/html/body/main/section[1]/section/div/div[5]/product-info/div[2]/div/div/p/span[2]/span'
psource = 'imagine'
arr = [pname,purl,pxpath,psource]
product_name_url_xpath_source.append(arr)

# 13-inch MacBook Air M1 256
pname = '13-inch MacBook Air M1'
purl = 'https://www.imagineonline.store/products/13-inch-macbook-air-apple-m1-chip-with-8-core-cpu-and-7-core-gpu-256gb-space-grey-1'
pxpath = '/html/body/main/section[1]/section/div/div[5]/product-info/div[2]/div/div/p[2]/span[2]/span'
psource = 'imagine'
arr = [pname,purl,pxpath,psource]
product_name_url_xpath_source.append(arr)

# 13-inch MacBook Air M2 256
pname = '13-inch MacBook Air M2 256'
purl = 'https://www.imagineonline.store/products/13-inch-macbook-air-mlxw3hn-a'
pxpath = '/html/body/main/section[1]/section/div/div[5]/product-info/div[2]/div/div/p/span[2]/span'
psource = 'imagine'
arr = [pname,purl,pxpath,psource]
product_name_url_xpath_source.append(arr)

# 13-inch MacBook Air M3 256
pname = '13-inch MacBook Air M3 256'
purl = 'https://www.imagineonline.store/products/13-inch-macbook-air-mrxn3hn-a'
pxpath = '/html/body/main/section[1]/section/div/div[5]/product-info/div[2]/div/div/p/span[2]/span'
psource = 'imagine'
arr = [pname,purl,pxpath,psource]
product_name_url_xpath_source.append(arr)

# 13-inch MacBook Air M4 256
pname = '13-inch MacBook Air M4 256'
purl = 'https://www.imagineonline.store/products/13-inch-macbook-air-mw123hn-a'
pxpath = '/html/body/main/section[1]/section/div/div[5]/product-info/div[2]/div/div/p/span[2]/span'
psource = 'imagine'
arr = [pname,purl,pxpath,psource]
product_name_url_xpath_source.append(arr)


length = len(product_name_url_xpath_source)
for i in range(length):
    driver.get(product_name_url_xpath_source[i][1])
    wait = WebDriverWait(driver,10)

    try:
        wait.until(EC.element_to_be_clickable((By.XPATH,product_name_url_xpath_source[i][2])))
        data = driver.find_element(By.XPATH,product_name_url_xpath_source[i][2])

        product_price = int(float(data.text.replace("₹","").replace(",","").strip()))
        new_price = macbook_prices(
        PRODUCT_NAME= product_name_url_xpath_source[i][0],
        PRODUCT_PRICE=product_price,
        DATE=date.today(),
        SOURCE=product_name_url_xpath_source[i][3]
        )
        db.add(new_price)
    except TimeoutException:
        print(f"Element not found for index {i}, skipping...")
    



db.commit()
db.close()







