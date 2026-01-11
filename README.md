so Adequate works
""""

ok so again check a if i am rigth or wrong

so student will give his assement and

" questions = [
        { q: "1. When faced with a high-pressure situation, do you prioritize your tasks and decisions?", o: ["Never prioritize", "Rarely", "Sometimes", "Often prioritize", "Always prioritize"] },
        { q: "2. What is your approach when you face a task that initially seems impossible?", o: ["Ignore the challenge", "Feel overwhelmed", "Think before acting", "Try despite doubts", "Accept the challenge"] },
        { q: "3. How do you manage stress in situations beyond your control?", o: ["I get annoyed", "Easily upset", "Somewhat stressed", "Stay calm", "I manage stress"] },
        { q: "4. Do you view past adversity as a learning experience?", o: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
        { q: "5. How do you handle criticism from others?", o: ["Take it personally", "Defend yourself", "Disregard it", "Reflect and adapt", "Acknowledge and grow"] },
        { q: "6. Your response to a major change in life?", o: ["Feel overwhelmed", "Deny it", "Seek support", "Assess it calmly", "Embrace and plan"] },
        { q: "7. How do you adapt to life changes?", o: ["Resist and dwell on the past", "Ignore changes", "Embrace new chances", "Take small steps", "Proactively adapt"] },
        { q: "8. Do you adjust goals when unexpected changes occur?", o: ["Never adjust", "Rarely", "Sometimes", "Often adjust", "Always adjust"] },
        { q: "9. Are you comfortable in uncertain situations?", o: ["Cannot work", "Slightly uncomfortable", "Neutral", "Mostly okay", "Very comfortable"] },
        { q: "10. Do you maintain positive relationships during adversity?", o: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
        { q: "11. Do you stay optimistic during challenging times?", o: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
        { q: "12. Being criticized for a subject assignment:", o: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
        { q: "13. Missing a flight or a train:", o: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
        { q: "14. Having multiple setbacks in one day:", o: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
        { q: "15. Arguing with someone and developing negative emotions:", o: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
        { q: "16. Your teacher adamantly disagrees with your idea:", o: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
        { q: "17. An important activity gets canceled:", o: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
        { q: "18. You lose something crucial to your well-being:", o: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
        { q: "19. You miss an important appointment:", o: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
        { q: "20. You message a friend, they see it but don't reply:", o: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
        { q: "21. You accidentally delete an important message:", o: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
        { q: "22. How do you react to a significant failure?", o: ["React negatively", "Dwell on it", "Accept but hesitate", "Try again", "Recover quickly"] },
        { q: "23. How do you solve complex problems under adversity?", o: ["Unable to solve", "Struggle often", "Try my best", "Often solve them", "Fully capable"] }
    ];"

thesea re the questions

and this is the logic

"aq_score = student_record['aq_score']
    if aq_score >= 180:
        aq_category = {"name": "Climber",
                       "description": "You excel at navigating challenges and consistently seek growth. You are highly resilient and resourceful."}
    elif aq_score >= 160:
        aq_category = {"name": "Moderate Climber",
                       "description": "You are resilient and consistently work to overcome challenges, showing a strong capacity for growth and adaptation."}
    elif aq_score >= 140:
        aq_category = {
            "name": "Camper", "description": "You are steady and reliable, but may sometimes avoid difficult challenges to stay in a comfortable zone."}
    elif aq_score >= 120:
        aq_category = {"name": "Moderate Camper",
                       "description": "You handle familiar situations well but tend to avoid new or significant challenges. There's a great opportunity to step outside your comfort zone."}
    else:
        aq_category = {"name": "Quitter",
                       "description": "You may feel overwhelmed by adversity and have an opportunity to develop stronger resilience strategies."}

control_score = sum(int(request.form.get(f'q{i}', 0)) for i in range(1, 4))
    ownership_score = sum(
        int(request.form.get(f'q{i}', 0)) for i in range(4, 12))
    reach_score = sum(int(request.form.get(f'q{i}', 0)) for i in range(12, 17))
    endurance_score = sum(
        int(request.form.get(f'q{i}', 0)) for i in range(17, 22))
    attitude_score = sum(int(request.form.get(f'q{i}', 0)) for i in [22, 23])
    total_aq_score = (control_score + ownership_score +
                      reach_score + endurance_score + attitude_score) * 2
"

in this way like this is basic underatnding of the application
