import { useState, useEffect } from 'react';
import { leaderboardAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trophy } from 'lucide-react';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await leaderboardAPI.getUsers();
      if (response?.data?.data) {
        // Sort users by points in descending order
        const sortedUsers = response.data.data.sort((a, b) => b.Points - a.Points);
        setUsers(sortedUsers);
      } else {
        throw new Error('Invalid user data format');
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setUsers([]);
      setError('Failed to load users. Please try again later.');
    }
  };

  const showHistory = async (username) => {
    try {
      setError(null);
      const response = await leaderboardAPI.getUserHistory(username);
      console.log("Fetched history response: ", response.data.data)

      if (Array.isArray(response?.data?.data)) {
        setHistory(response.data.data);
        console.log("Setting history to:", response.data.data);
      } else {
        throw new Error("Invalid history data format");
      }

      setSelectedUser(username);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch history:', error);
      setHistory([]);
      setError(`Failed to load history for ${username}. Please try again later.`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setHistory([]);
    setSelectedUser(null);
    setError(null);
  };

  const getRankDisplay = (index) => {
    if (index === 0) {
      return (
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-bold text-yellow-500">1st</span>
        </div>
      );
    } else if (index === 1) {
      return (
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-gray-400" />
          <span className="font-bold text-gray-400">2nd</span>
        </div>
      );
    } else if (index === 2) {
      return (
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-orange-500" />
          <span className="font-bold text-orange-500">3rd</span>
        </div>
      );
    }
    return <span className="text-gray-600">{index + 1}th</span>;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Leaderboard</h2>
      
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-24">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow 
                key={user._id}
                className={
                  index < 3 
                    ? 'bg-opacity-10 ' + 
                      (index === 0 ? 'bg-yellow-50' : 
                       index === 1 ? 'bg-gray-50' : 
                       'bg-orange-50')
                    : ''
                }
              >
                <TableCell className="font-medium">
                  {getRankDisplay(index)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.firstName}</span>
                    <span className="text-sm text-gray-500">@{user.username}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold text-green-600">
                    {user.Points.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => showHistory(user.username)}
                    className="hover:bg-gray-100"
                  >
                    View History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? `Points History - ${selectedUser}` : 'Points History'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {history.length > 0 ? (
              <div className="divide-y">
                {history.map((entry, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center py-3"
                  >
                    <span className="text-gray-600">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <span className="font-medium text-green-600">
                      +{entry.pointsAwarded} points
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No history available
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}