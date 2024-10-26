import { useState, useEffect } from 'react';
import { leaderboardAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '../components/ui/use-toast';
import { User, Trophy } from 'lucide-react';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    fetchFriends();
  }, [activeTab]);

  const fetchFriends = async () => {
    try {
      const response = await leaderboardAPI.getUsers();
      // Sort friends by points in descending order and add rank
      const rankedFriends = response.data.data
        .slice(0, 10)
        .sort((a, b) => b.Points - a.Points)
        .map((friend, index) => ({
          ...friend,
          rank: index + 1
        }));
      setFriends(rankedFriends);
    } catch (error) {
      console.error('Failed to fetch friends:', error);
    }
  };

  const sortAndRankData = (data) => {
    return data
      .sort((a, b) => {
        // Sort by totalPointsAwarded or totalPoints in descending order
        const pointsA = a.totalPointsAwarded || a.totalPoints || 0;
        const pointsB = b.totalPointsAwarded || b.totalPoints || 0;
        return pointsB - pointsA;
      })
      .map((item, index) => ({
        ...item,
        rank: index + 1
      }));
  };

  const fetchData = async () => {
    try {
      let response;
      switch (activeTab) {
        case 'daily':
          response = await leaderboardAPI.getTodayHistory();
          if (response.data.success) {
            const sortedData = sortAndRankData(response.data.data);
            setDailyData(sortedData);
            const total = sortedData.reduce((sum, item) => 
              sum + (item.totalPointsAwarded || item.totalPoints || 0), 0);
            setTotalPoints(total);
          }
          break;
        case 'weekly':
          response = await leaderboardAPI.getWeeklyData();
          if (response.data.success) {
            setWeeklyData(sortAndRankData(response.data.data));
          }
          break;
        case 'monthly':
          response = await leaderboardAPI.getMonthlyData();
          if (response.data.success) {
            setMonthlyData(sortAndRankData(response.data.data));
          }
          break;
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handlePointsClaim = async (username) => {
    try {
      await leaderboardAPI.claimPoints(username);
      toast({
        title: `Points claimed successfully for ${username}`,
        duration: 2000,
        position: 'top-right',
      });
      fetchFriends();
      fetchData();
    } catch (error) {
      console.error('Failed to claim points:', error);
      toast({
        title: "Failed to claim points",
        variant: "destructive",
        duration: 2000,
        position: 'top-right',
      });
    }
  };

  const renderTopThree = (data) => {
    const topThree = data.slice(0, 3);
    return (
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
        {topThree.map((user) => (
          <div key={user._id} className="flex flex-col items-center justify-center p-4 rounded-lg">
            <User className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium">{user._id}</span>
            <span className="text-xs text-orange-500">
              Prize: ₹{user.totalPointsAwarded || user.totalPoints || 0}
            </span>
            <span className="text-xs text-green-500">
              {user.totalPointsAwarded || user.totalPoints || 0}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderUserList = (data) => {
    const remainingUsers = data.slice(3);
    return remainingUsers.map((user) => (
      <div 
        key={user._id}
        className={`flex items-center justify-between p-4 ${
          user.rank % 2 === 1 ? 'bg-gray-50' : 'bg-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <User className="h-6 w-6 text-gray-400" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {user._id}
            </span>
            <span className="text-xs text-gray-500">
              Rank: {user.rank}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-orange-500">
            Prize: ₹{user.totalPointsAwarded || user.totalPoints || 0}
          </span>
          <span className="text-green-500 ml-4">
            {user.totalPointsAwarded || user.totalPoints || 0}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Leaderboard Section */}
      <Card className="w-full max-w-3xl mx-auto mb-8">
        <CardContent className="p-0">
          <div className="bg-blue-500 p-4 text-white">
            <div className="flex justify-between items-center">
              <div>
                <span className="block">{totalPoints} - Today</span>
                <span className="block">₹{(totalPoints * 0.75).toFixed(2)}</span>
              </div>
              <span className="text-lg">LeaderBoard</span>
            </div>
          </div>

          <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b">
              <TabsList className="w-full justify-center">
                <TabsTrigger 
                  value="daily"
                  className="flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Daily
                </TabsTrigger>
                <TabsTrigger 
                  value="weekly"
                  className="flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger 
                  value="monthly"
                  className="flex-1 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="daily">
              {renderTopThree(dailyData)}
              <div className="divide-y">
                {renderUserList(dailyData)}
              </div>
            </TabsContent>

            <TabsContent value="weekly">
              {renderTopThree(weeklyData)}
              <div className="divide-y">
                {renderUserList(weeklyData)}
              </div>
            </TabsContent>

            <TabsContent value="monthly">
              {renderTopThree(monthlyData)}
              <div className="divide-y">
                {renderUserList(monthlyData)}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Friends List Section */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Friends List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {friends.map((friend) => (
          <Card key={friend._id} className="hover:shadow-lg transition-shadow border border-gray-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {friend.rank <= 3 && (
                    <Trophy className={`h-5 w-5 ${
                      friend.rank === 1 ? 'text-yellow-500' :
                      friend.rank === 2 ? 'text-gray-400' :
                      'text-orange-500'
                    }`} />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{friend.firstName}</h3>
                    <p className="text-sm text-gray-500">
                      Points: {friend.Points} • Rank: {friend.rank}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => handlePointsClaim(friend.username)}
                  variant="outline"
                  className="hover:bg-gray-100 transition-colors"
                >
                  Give Points
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}