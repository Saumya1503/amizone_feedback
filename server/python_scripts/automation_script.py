import sys

Username = sys.argv[1]
Password = sys.argv[2]

# Username = '8493455'
# Password = 'tusshardhiman2424'

import json
import requests
from bs4 import BeautifulSoup 
from urllib.parse import urlparse, parse_qs

try:
    with requests.session() as s:

        r = s.get("https://s.amizone.net/")

        bs = BeautifulSoup(r.content, 'html.parser')
        token = bs.find('input', attrs={'name': '__RequestVerificationToken'})["value"]

        login_data = {
                "__RequestVerificationToken":token,
                "_UserName":Username,
                "_QString":"",
                "_Password":Password
        }

        headers = {
            "Referer":"https://s.amizone.net/FacultyFeeback/FacultyFeedback",
        }

        s.headers.update(headers)

        resp = s.post("https://s.amizone.net/", data=login_data)

        if resp.headers['Set-Cookie']:

            resp = s.get("https://s.amizone.net/FacultyFeeback/FacultyFeedback")

            soup = BeautifulSoup(resp.text, 'html.parser')


            for teacher in soup.find_all("li", class_="open"):

                try:

                    data = teacher.find("a", {"class":"btn btn-primary btn-minier"})['href']

                    if data:
                        url = "https://s.amizone.net"+data
                        s.post(url)
                        url = urlparse(url)
                        params = parse_qs(url.query)
                        feedback = {
                            "CourseType":params['CourseType'][0],
                            "clsCourseFaculty.iDetId":params['DetID'][0],
                            "clsCourseFaculty.iFacultyStaffId":params['FacultyStaffID'][0],
                            "clsCourseFaculty.iSRNO":params['SrNo'][0],
                            "FeedbackRating%5B0%5D.iAspectId":"1",
                            "FeedbackRating%5B0%5D.Rating":"5",
                            "FeedbackRating%5B1%5D.iAspectId":"3",
                            "FeedbackRating%5B1%5D.Rating":"5",
                            "FeedbackRating%5B2%5D.iAspectId":"4",
                            "FeedbackRating%5B2%5D.Rating":"5",
                            "FeedbackRating%5B3%5D.iAspectId":"5",
                            "FeedbackRating%5B3%5D.Rating":"5",
                            "FeedbackRating%5B4%5D.iAspectId":"6",
                            "FeedbackRating%5B4%5D.Rating":"5",
                            "FeedbackRating%5B5%5D.iAspectId":"7",
                            "FeedbackRating%5B5%5D.Rating":"5",
                            "FeedbackRating%5B6%5D.iAspectId":"8",
                            "FeedbackRating%5B6%5D.Rating":"5",
                            "FeedbackRating%5B7%5D.iAspectId":"9",
                            "FeedbackRating%5B7%5D.Rating":"5",
                            "FeedbackRating%5B8%5D.iAspectId":"10",
                            "FeedbackRating%5B8%5D.Rating":"5",
                            "FeedbackRating%5B9%5D.iAspectId":"11",
                            "FeedbackRating%5B9%5D.Rating":"5",
                            "FeedbackRating%5B10%5D.iAspectId":"12",
                            "FeedbackRating%5B10%5D.Rating":"5",
                            "FeedbackRating%5B11%5D.iAspectId":"13",
                            "FeedbackRating%5B11%5D.Rating":"5",
                            "FeedbackRating%5B12%5D.iAspectId":"14",
                            "FeedbackRating%5B12%5D.Rating":"5",
                            "FeedbackRating%5B13%5D.iAspectId":"15",
                            "FeedbackRating%5B13%5D.Rating":"5",
                            "FeedbackRating%5B14%5D.iAspectId":"18",
                            "FeedbackRating%5B14%5D.Rating":"5",
                            "FeedbackRating%5B15%5D.iAspectId":"28",
                            "FeedbackRating%5B15%5D.Rating":"5",
                            "FeedbackRating%5B16%5D.iAspectId":"22",
                            "FeedbackRating%5B16%5D.Rating":"5",
                            "FeedbackRating%5B17%5D.iAspectId":"23",
                            "FeedbackRating%5B17%5D.Rating":"5",
                            "FeedbackRating%5B18%5D.iAspectId":"24",
                            "FeedbackRating%5B18%5D.Rating":"5",
                            "FeedbackRating%5B19%5D.iAspectId":"25",
                            "FeedbackRating%5B19%5D.Rating":"5",
                            "FeedbackRating_Q1Rating":"1",
                            "FeedbackRating_Q2Rating":"1",
                            "FeedbackRating_Q3Rating":"1",
                            "FeedbackRating_Q5Rating":"1",
                            "FeedbackRating_Comments":"Good",
                            "X-Requested-With":"XMLHttpRequest"

                        }

                        s.post("https://s.amizone.net/FacultyFeeback/FacultyFeedback/SaveFeedbackRating", feedback)

                except: 
                    # print("Error in Faculty")
                    pass

            print("success")
except: 
    print("error")