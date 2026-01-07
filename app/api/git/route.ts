import { NextResponse } from 'next/server';

const query = `
query userProblemsSolved($username: String!) {
  matchedUser(username: $username) {
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}
`;



export async function GET() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const response = await fetch(`https://api.github.com/search/commits?q=author:dellano54+author-date:%3E${oneWeekAgo.toISOString().split('T')[0]}&sort=author-date&order=desc`);
    const data = await response.json();

    const leetcodeResponse = await fetch("https://leetcode.com/graphql", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: {"username": "Dellanosamuel"}
        })
    })

    const LeetcodeData = await leetcodeResponse.json();
    var leetData = 0;

    LeetcodeData.data.matchedUser.submitStatsGlobal.acSubmissionNum.forEach(
      (element: { count: number }) => {
        leetData += element.count;
      }
    );


    return NextResponse.json({
        gitCommits: data.total_count,
        leetcode: leetData
    })

}



