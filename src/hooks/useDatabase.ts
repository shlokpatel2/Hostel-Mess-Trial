import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MenuItem, Worker, Complaint, Announcement } from '../types';

// Menu hooks
export const useMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('day');

      if (error) throw error;

      const formattedMenu = data.map(item => ({
        id: item.id,
        day: item.day,
        breakfast: item.breakfast || [],
        lunch: item.lunch || [],
        snacks: item.snacks || [],
        dinner: item.dinner || []
      }));

      setMenu(formattedMenu);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menu');
    } finally {
      setLoading(false);
    }
  };

  const updateMenu = async (dayId: string, updatedMenu: Partial<MenuItem>) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({
          breakfast: updatedMenu.breakfast,
          lunch: updatedMenu.lunch,
          snacks: updatedMenu.snacks,
          dinner: updatedMenu.dinner,
          updated_at: new Date().toISOString()
        })
        .eq('id', dayId);

      if (error) throw error;
      await fetchMenu(); // Refresh the menu
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update menu');
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return { menu, loading, error, updateMenu, refetch: fetchMenu };
};

// Workers hooks
export const useWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .order('name');

      if (error) throw error;

      const formattedWorkers = data.map(worker => ({
        id: worker.id,
        name: worker.name,
        photo: worker.photo,
        upiId: worker.upi_id,
        role: worker.role
      }));

      setWorkers(formattedWorkers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return { workers, loading, error, refetch: fetchWorkers };
};

// Complaints hooks
export const useComplaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedComplaints = data.map(complaint => ({
        id: complaint.id,
        studentId: complaint.student_id,
        studentName: complaint.student_name,
        category: complaint.category,
        description: complaint.description,
        image: complaint.image_url,
        timestamp: new Date(complaint.created_at),
        status: complaint.status as 'pending' | 'resolved'
      }));

      setComplaints(formattedComplaints);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const createComplaint = async (complaint: {
    studentId: string;
    studentName: string;
    category: string;
    description: string;
    image?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('complaints')
        .insert({
          student_id: complaint.studentId,
          student_name: complaint.studentName,
          category: complaint.category,
          description: complaint.description,
          image_url: complaint.image || null
        });

      if (error) throw error;
      await fetchComplaints(); // Refresh complaints
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create complaint');
      throw err;
    }
  };

  const updateComplaintStatus = async (complaintId: string, status: 'pending' | 'resolved') => {
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ status })
        .eq('id', complaintId);

      if (error) throw error;
      await fetchComplaints(); // Refresh complaints
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update complaint');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return { complaints, loading, error, createComplaint, updateComplaintStatus, refetch: fetchComplaints };
};

// Announcements hooks
export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedAnnouncements = data.map(announcement => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        timestamp: new Date(announcement.created_at),
        priority: announcement.priority as 'low' | 'medium' | 'high'
      }));

      setAnnouncements(formattedAnnouncements);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return { announcements, loading, error, refetch: fetchAnnouncements };
};