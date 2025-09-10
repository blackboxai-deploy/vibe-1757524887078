"use client";

import React from 'react';
import { DeckState, Track } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface DeckControllerProps {
  deck: DeckState;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onVolumeChange: (volume: number) => void;
  onPositionChange: (position: number) => void;
  onTrackLoad: (track: Track) => void;
}

export const DeckController: React.FC<DeckControllerProps> = ({
  deck,
  onPlay,
  onPause,
  onStop,
  onVolumeChange,
  onPositionChange,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = deck.currentTrack 
    ? (deck.position / deck.currentTrack.duration) * 100
    : 0;

  return (
    <Card className="p-4 bg-gray-900 border-gray-700">
      {/* Deck Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xl font-bold border-blue-500 text-blue-400">
            DECK {deck.id}
          </Badge>
          {deck.isPlaying && (
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <Badge variant="secondary" className="bg-gray-800">
          {deck.currentTrack?.bpm} BPM
        </Badge>
      </div>

      {/* Track Info */}
      <div className="mb-4 min-h-[80px] p-3 bg-gray-800 rounded-lg">
        {deck.currentTrack ? (
          <div>
            <h3 className="text-white font-semibold text-lg truncate">
              {deck.currentTrack.title}
            </h3>
            <p className="text-gray-400 truncate">{deck.currentTrack.artist}</p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant="outline" className="text-xs">
                {deck.currentTrack.genre}
              </Badge>
              <span className="text-gray-500 text-sm">
                {formatTime(deck.currentTrack.duration)}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              Drag a track here or<br />select from search
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-white text-sm w-12">
            {formatTime(deck.position)}
          </span>
          <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-white text-sm w-12">
            {deck.currentTrack ? formatTime(deck.currentTrack.duration) : '0:00'}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-3 mb-4">
        <Button
          onClick={onPlay}
          disabled={!deck.currentTrack}
          size="lg"
          className={`w-16 h-16 rounded-full text-xl font-bold ${
            deck.isPlaying 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {deck.isPlaying ? '⏸' : '▶'}
        </Button>
        <Button
          onClick={onStop}
          disabled={!deck.currentTrack}
          size="lg"
          variant="outline"
          className="w-12 h-12 rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        >
          ⏹
        </Button>
      </div>

      {/* Volume Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">Volume</span>
          <span className="text-gray-400 text-sm">{deck.volume}%</span>
        </div>
        <Slider
          value={[deck.volume]}
          onValueChange={(value) => onVolumeChange(value[0])}
          max={100}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      {/* Additional Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          CUE
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          SYNC
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          LOOP
        </Button>
      </div>
    </Card>
  );
};