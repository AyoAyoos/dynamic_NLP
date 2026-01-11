import React, { useState } from 'react';

const DynamicAQ = () => {
  // 1. STATE
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null); // Changed to null to store object
  const [loading, setLoading] = useState(false);

  // 2. DATA
  const questions = [
    { id: 1, q: "1. When faced with a high-pressure situation, do you prioritize your tasks and decisions?", options: ["Never prioritize", "Rarely", "Sometimes", "Often prioritize", "Always prioritize"] },
    { id: 2, q: "2. What is your approach when you face a task that initially seems impossible?", options: ["Ignore the challenge", "Feel overwhelmed", "Think before acting", "Try despite doubts", "Accept the challenge"] },
    { id: 3, q: "3. How do you manage stress in situations beyond your control?", options: ["I get annoyed", "Easily upset", "Somewhat stressed", "Stay calm", "I manage stress"] },
    { id: 4, q: "4. Do you view past adversity as a learning experience?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, q: "5. How do you handle criticism from others?", options: ["Take it personally", "Defend yourself", "Disregard it", "Reflect and adapt", "Acknowledge and grow"] },
    { id: 6, q: "6. Your response to a major change in life?", options: ["Feel overwhelmed", "Deny it", "Seek support", "Assess it calmly", "Embrace and plan"] },
    { id: 7, q: "7. How do you adapt to life changes?", options: ["Resist and dwell on the past", "Ignore changes", "Embrace new chances", "Take small steps", "Proactively adapt"] },
    { id: 8, q: "8. Do you adjust goals when unexpected changes occur?", options: ["Never adjust", "Rarely", "Sometimes", "Often adjust", "Always adjust"] },
    { id: 9, q: "9. Are you comfortable in uncertain situations?", options: ["Cannot work", "Slightly uncomfortable", "Neutral", "Mostly okay", "Very comfortable"] },
    { id: 10, q: "10. Do you maintain positive relationships during adversity?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 11, q: "11. Do you stay optimistic during challenging times?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 12, q: "12. Being criticized for a subject assignment:", options: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
    { id: 13, q: "13. Missing a flight or a train:", options: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
    { id: 14, q: "14. Having multiple setbacks in one day:", options: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
    { id: 15, q: "15. Arguing with someone and developing negative emotions:", options: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
    { id: 16, q: "16. Your teacher adamantly disagrees with your idea:", options: ["Affects all aspects of life", "Affects many areas", "Affects some areas", "Affects only this area", "Limited to the situation"] },
    { id: 17, q: "17. An important activity gets canceled:", options: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
    { id: 18, q: "18. You lose something crucial to your well-being:", options: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
    { id: 19, q: "19. You miss an important appointment:", options: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
    { id: 20, q: "20. You message a friend, they see it but don't reply:", options: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
    { id: 21, q: "21. You accidentally delete an important message:", options: ["Least relevant", "Slightly relevant", "Moderately relevant", "Very relevant", "Most relevant"] },
    { id: 22, q: "22. How do you react to a significant failure?", options: ["React negatively", "Dwell on it", "Accept but hesitate", "Try again", "Recover quickly"] },
    { id: 23, q: "23. How do you solve complex problems under adversity?", options: ["Unable to solve", "Struggle often", "Try my best", "Often solve them", "Fully capable"] }
  ];

  // 3. HANDLE OPTION CLICK
  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers({ ...answers, [`q${questionId}`]: optionIndex + 1 });
  };

  // 4. CALCULATE SCORES (The Math Logic)
  const calculateScores = () => {
    const getScore = (id) => answers[`q${id}`] || 0;

    // Control: Q1-3
    const control = [1,2,3].reduce((acc, id) => acc + getScore(id), 0);
    
    // Ownership: Q4-11
    const ownership = [4,5,6,7,8,9,10,11].reduce((acc, id) => acc + getScore(id), 0);
    
    // Reach: Q12-16
    const reach = [12,13,14,15,16].reduce((acc, id) => acc + getScore(id), 0);
    
    // Endurance: Q17-21
    const endurance = [17,18,19,20,21].reduce((acc, id) => acc + getScore(id), 0);
    
    // Attitude: Q22-23
    const attitude = [22,23].reduce((acc, id) => acc + getScore(id), 0);

    const total = (control + ownership + reach + endurance + attitude) * 2;
    
    let label = "Quitter";
    if (total >= 180) label = "Climber";
    else if (total >= 160) label = "Moderate Climber";
    else if (total >= 140) label = "Camper";
    else if (total >= 120) label = "Moderate Camper";

    return { control, ownership, reach, endurance, attitude, total, label };
  };

  const handleSubmit = () => {
    setLoading(true);
    const scores = calculateScores();
    
    setTimeout(() => {
        setResult({
            scores: scores,
            aiText: `(MOCK AI OUTPUT)\n\nHello! I see you scored ${scores.total}. Your profile as a '${scores.label}' is interesting. \n\nYour highest trait is Ownership (${scores.ownership}), meaning you take responsibility. However, your Control score is ${scores.control}, suggesting you sometimes feel helpless to change the outcome.`
        });
        setLoading(false);
    }, 1000)
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333" }}>
      
      <h1 style={{textAlign: 'center', color: '#1e3a8a', marginBottom: '10px'}}>Dynamic AQ Assessment</h1>
      
      {/* QUESTIONS */}
      <div>
        {questions.map((item) => (
            <div key={item.id} style={{ marginBottom: "25px", padding: "20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "16px", color: "#1f2937" }}>{item.q}</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {item.options.map((opt, index) => {
                const isSelected = answers[`q${item.id}`] === index + 1;
                return (
                    <label key={index} style={{ 
                        cursor: "pointer", padding: "8px 12px", borderRadius: "6px", fontSize: "13px", flex: "1 1 auto", textAlign: "center",
                        background: isSelected ? "#2563eb" : "#f3f4f6", 
                        color: isSelected ? "#ffffff" : "#374151",      
                        fontWeight: isSelected ? "600" : "400"
                    }}>
                        <input type="radio" name={`q-${item.id}`} value={index + 1} onChange={() => handleOptionChange(item.id, index)} style={{ display: "none" }} />
                        {opt}
                    </label>
                );
                })}
            </div>
            </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button onClick={handleSubmit} disabled={loading} style={{ padding: "16px 40px", fontSize: "18px", backgroundColor: "#1e40af", color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold" }}>
            {loading ? "Calculating..." : "Submit & Analyze"}
          </button>
      </div>

      {/* RESULTS DISPLAY */}
      {result && (
        <div style={{ marginTop: "40px" }}>
            
            {/* 1. SCORECARD GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "15px", marginBottom: "30px" }}>
                <ScoreBox title="Control" score={result.scores.control} max={15} color="#ef4444" />
                <ScoreBox title="Ownership" score={result.scores.ownership} max={40} color="#f97316" />
                <ScoreBox title="Reach" score={result.scores.reach} max={25} color="#eab308" />
                <ScoreBox title="Endurance" score={result.scores.endurance} max={25} color="#22c55e" />
                <ScoreBox title="Attitude" score={result.scores.attitude} max={10} color="#3b82f6" />
                <div style={{ background: "#1e3a8a", color: "white", padding: "15px", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Total AQ</div>
                    <div style={{ fontSize: "32px", fontWeight: "bold" }}>{result.scores.total}</div>
                    <div style={{ fontSize: "14px", marginTop: "5px" }}>{result.scores.label}</div>
                </div>
            </div>

            {/* 2. AI ANALYSIS */}
            <div style={{ padding: "30px", backgroundColor: "#eff6ff", border: "2px solid #3b82f6", borderRadius: "12px", color: "#1e3a8a" }}>
                <h2 style={{marginTop: 0, borderBottom: "1px solid #bfdbfe", paddingBottom: "10px"}}>Psychological Analysis</h2>
                <p style={{ fontSize: "18px", lineHeight: "1.7", whiteSpace: "pre-wrap" }}>{result.aiText}</p>
            </div>
        </div>
      )}
    </div>
  );
};

// Helper Component for the little score boxes
const ScoreBox = ({ title, score, max, color }) => (
    <div style={{ background: "white", padding: "15px", borderRadius: "10px", textAlign: "center", borderTop: `4px solid ${color}`, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <div style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "1px" }}>{title}</div>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333", margin: "5px 0" }}>{score} <span style={{fontSize: "14px", color: "#999", fontWeight: "normal"}}>/ {max}</span></div>
    </div>
);

export default DynamicAQ;